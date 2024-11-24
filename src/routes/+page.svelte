<script lang="ts">
	import { startDownload } from './downloader';
	import Input from './Input.svelte';

	let fileContents = $state('');
	let startDateTime = $state('');
	let endDateTime = $state('');

	let progress = $state(0);

	let stopReadFlag = $state(false);
	let stopReadVisible = $state(false);

	async function* getFileLines(file: File) {
		const decoder = new TextDecoder();
		let buffer = '';
		const totalSize = file.size;
		let processedSize = 0;
		let batchSize = 0;

		const stream = file.stream();
		const reader = stream.getReader();

		while (!stopReadFlag) {
			const { done, value } = await reader.read();

			if (done) {
				// Yield the last line if any
				if (buffer.length > 0) {
					yield buffer;
				}
				break;
			}
			processedSize += value.length;
			progress = (processedSize / totalSize) * 100;

			buffer += decoder.decode(value);
			const lines = buffer.split('\n');

			batchSize += lines.length;

			// Update UI every 1000 lines or so
			if (batchSize >= 1000) {
				//	stopReadFlag = true;
				batchSize = 0;
				// Allow UI to update
				await new Promise((resolve) => setTimeout(resolve, 0));
			}

			// Keep the last partial line in buffer
			buffer = lines.pop() ?? '';

			// Yield complete lines
			for (const line of lines) {
				yield line;
			}
		}
	}

	async function processFile(file: File) {
		const fileStream = await startDownload();
		const header = `
	<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Example GPX Writer"
     xmlns="http://www.topografix.com/GPX/1/1"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/1
     http://www.topografix.com/GPX/1/1/gpx.xsd">

  <metadata>
    <name>${file.name}</name>
    <time>${new Date().toISOString()}</time>
  </metadata>\n`;
		const formatter = new Intl.DateTimeFormat();

		const encoder = new TextEncoder();
		await fileStream.write(encoder.encode(header));
		const startDate = startDateTime ? new Date(startDateTime) : null;
		const endDate = endDateTime ? new Date(endDateTime) : null;
		stopReadFlag = false;
		stopReadVisible = true;
		try {
			let insidePath = false;
			let currentPosition = {
				point: [0, 0],
				timestamp: new Date()
			};

			for await (const line of getFileLines(file)) {
				switch (line) {
					case '      "timelinePath": [':
						insidePath = true;
						break;
					case '      ]':
						insidePath = false;
						if (isBetween(currentPosition.timestamp, startDate, endDate)) {
							const waypoint = `<wpt lat="${currentPosition.point[0]}" lon="${currentPosition.point[1]}"><time>${currentPosition.timestamp.toISOString()}</time></wpt>\n`;
							// do not wait the write to finish
							fileStream.write(encoder.encode(waypoint));
							fileContents = JSON.stringify(currentPosition);
						} else {
							fileContents = 'Skipping ' + formatter.format(currentPosition.timestamp);
						}
						break;
				}

				if (insidePath) {
					const pointsMatch = line.match(/\s+"point": "(.*)°, (.*)°",/);
					if (pointsMatch) {
						currentPosition.point = [parseFloat(pointsMatch[1]), parseFloat(pointsMatch[2])];
					} else {
						const timeMatch = line.match(/\s+"time": "(.*)"/);
						if (timeMatch) {
							currentPosition.timestamp = new Date(timeMatch[1]);
						}
					}
				}

				// fileContents = line + '\n';
				// console.log(progress + ' ' + line);
			}

			// Write GPX footer
			await fileStream.write(encoder.encode('</gpx>'));
			await fileStream.close();
		} catch (error) {
			console.error('Error processing file:', error);
			await fileStream.abort(error);
		} finally {
			stopReadVisible = false;
		}
	}

	async function dropFile(event: DragEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		const file = event!.dataTransfer!.files[0];
		await processFile(file);
	}

	async function loadFile(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const file = event!.target!.files[0];
		await processFile(file);
	}

	function stopRead(event: MouseEvent) {
		stopReadFlag = true;
	}

	function isBetween(timestamp: Date, startDate: Date | null, endDate: Date | null): boolean {
		return (!startDate || timestamp >= startDate) && (!endDate || timestamp <= endDate);
	}
</script>

<form
	onsubmit={(e) => e.preventDefault()}
	ondrop={dropFile}
	ondragover={(e) => e.preventDefault()}
	class="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-lg"
>
	<Input id="startDateTime" bind:value={startDateTime} label="Start date" />
	<Input id="endDateTime" bind:value={endDateTime} label="End date" />

	<div class="mb-6 space-y-4">
		<input
			type="file"
			id="inputFile"
			onchange={loadFile}
			value="load file"
			class="block w-full text-sm text-gray-500
          file:mr-4 file:rounded-md file:border-0
          file:bg-blue-50 file:px-4
          file:py-2 file:text-sm
          file:font-semibold file:text-blue-700
          hover:file:bg-blue-100"
		/>
		{#if stopReadVisible}
			<button
				type="button"
				onclick={stopRead}
				disabled={stopReadFlag}
				class="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
				>Stop</button
			>
		{/if}
	</div>
	<div class="mb-6">
		<progress
			value={progress}
			max="100"
			class="h-2 w-full overflow-hidden rounded-full bg-gray-200"
		>
			<div class="h-full bg-blue-600" style="width: {progress}%"></div>
		</progress>
	</div>
</form>

<pre>
    {fileContents}
</pre>

<style lang="postcss">
	progress {
	}
</style>
