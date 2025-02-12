function embedVideo(link) {
    const embedLink = link;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedLink);
    const videoDiv = document.querySelector('.video');
    videoDiv.innerHTML = '';
    videoDiv.appendChild(iframe);
}
const driveLink = 'https://drive.google.com/file/d/1prFO2cRCUsLezTLqddQK4a2repB4AWAu/preview';
embedVideo(driveLink);