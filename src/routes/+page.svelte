<script lang="ts">
	let fileContents = $state('');
	let progress = $state(0);

	let stopReadFlag = $state(false);

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
		stopReadFlag = false;
		try {
			console.log({ file });
			for await (const line of getFileLines(file)) {
				fileContents += line + '\n';
				console.log(progress + ' ' + line);
			}
		} catch (error) {
			console.error('Error processing file:', error);
		}
	}

	function dropFile(event: DragEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		const file = event!.dataTransfer!.files[0];
		processFile(file);
		// const reader = new FileReader();

		// reader.onload = function (e) {
		// 	console.log({ e });
		// 	fileContents = e!.target!.result!.toString();
		// 	//console.log(contents);
		// };

		// reader.readAsText(file);
	}

	async function loadFile(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const file = event!.target!.files[0];
		await processFile(file);
		// const reader = new FileReader();

		// reader.onload = function (e) {
		// 	console.log({ e });
		// 	fileContents = e!.target!.result!.toString();
		// 	// console.log(contents);
		// };

		// reader.readAsText(file);
	}

	function stopRead(event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {}
</script>

<form onsubmit={(e) => e.preventDefault()} ondrop={dropFile} ondragover={(e) => e.preventDefault()}>
	<input type="file" id="inputFile" onchange={loadFile} value="load file" />
	<input type="button" onclick={stopRead} value="stop" />
	<progress value={progress} max="100"></progress>
</form>

<pre>
    {fileContents}
</pre>

<style lang="postcss">
	progress {
	}
</style>
