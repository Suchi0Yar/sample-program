function insertVideo(link) {
    if (!link) {
        console.error('Invalid video link');
        return;
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.classList.add('video-iframe');
    iframe.setAttribute('allowfullscreen', '');
    
    const videoDiv = document.querySelector('.video');
    if (!videoDiv) {
        console.error('Video container not found');
        return;
    }
    
    videoDiv.innerHTML = '';
    videoDiv.appendChild(iframe);
}

const driveLink = 'https://drive.google.com/file/d/1prFO2cRCUsLezTLqddQK4a2repB4AWAu/preview';

const button = document.createElement('button');
button.textContent = 'Play Video';
button.classList.add('video-button');
button.addEventListener('click', () => insertVideo(driveLink));

document.body.appendChild(button);
function insertVideo(link) {
    if (!link) {
        console.error('Invalid video link');
        return;
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.classList.add('video-iframe');
    iframe.setAttribute('allowfullscreen', '');
    
    const videoDiv = document.querySelector('.video');
    if (!videoDiv) {
        console.error('Video container not found');
        return;
    }
    
    videoDiv.innerHTML = '';
    videoDiv.appendChild(iframe);
}

