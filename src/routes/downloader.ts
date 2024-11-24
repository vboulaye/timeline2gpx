// Function to start the download
export async function startDownload(): Promise<WritableStreamDefaultWriter<any>> {
	const streams = new TransformStream();
	const writer = streams.writable.getWriter();
	// fileStream = writer;

	// // Create the download link
	// const url = URL.createObjectURL(new Blob([], { type: 'application/gpx+xml' }));
	// downloadLink = url;

	// Start streaming to file, but don't wait for it to finish
	streamToFile(streams.readable);
	return writer;
}

// Function to stream to file
async function streamToFile(readable: ReadableStream) {
	const fileName = 'output.gpx';
	if ('showSaveFilePicker' in window) {
		try {
			const handle = await window.showSaveFilePicker({
				suggestedName: fileName,
				types: [
					{
						description: 'GPX File',
						accept: { 'application/gpx+xml': ['.gpx'] }
					}
				]
			});
			const writable = await handle.createWritable();
			await readable.pipeTo(writable);
		} catch (err) {
			console.error('Error saving file:', err);
		}
	} else {
		// Fallback for browsers that don't support showSaveFilePicker
		const response = new Response(readable);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
}
