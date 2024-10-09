document.getElementById('download-btn').addEventListener('click', () => {
  const videoUrl = document.getElementById('video-url').value;
  const status = document.getElementById('status');
  
  status.textContent = 'Processing...';

  fetch('/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: videoUrl }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        status.textContent = 'Download link: ' + data.downloadLink;
      } else {
        status.textContent = 'Error: ' + data.message;
      }
    })
    .catch(err => {
      console.error(err);
      status.textContent = 'Error: Unable to process request';
    });
});
