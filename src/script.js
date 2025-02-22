async function downloadVideo() {
    const urlInput = document.getElementById('videoUrl');
    let videoUrl = urlInput.value.trim();
    const errorMessage = document.getElementById('error-message');
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.getElementById('video');
    const downloadLink = document.getElementById('download-link');

    errorMessage.textContent = ''; 
    videoContainer.style.display = 'none';

    if (!videoUrl) {
        errorMessage.textContent = 'Please enter a valid TikTok video link.';
        return;
    }

    try {
        // Fetch video URL from API
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`);
        if (!response.ok) throw new Error('Failed to fetch video.');

        const data = await response.json();
        if (!data || !data.data || !data.data.play) throw new Error('Error retrieving video.');

        // Get the video URL
        const videoObjectUrl = data.data.play;

        // Set video source
        videoElement.src = videoObjectUrl;
        downloadLink.href = videoObjectUrl;
        downloadLink.innerText = 'Download Video';
        videoContainer.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
