const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイルを提供
app.use(express.static('public'));
app.use(express.json());

app.post('/download', (req, res) => {
  const videoUrl = req.body.url;

  // yt-dlpを使って動画をダウンロード
  const outputPath = path.resolve(__dirname, 'downloads/video.mp3'); // 保存するパス
  const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" ${videoUrl}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.json({ success: false, message: 'Failed to download video' });
    }

    console.log(`Downloaded: ${stdout}`);
    res.json({ success: true, downloadLink: '/downloads/video.mp3' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
