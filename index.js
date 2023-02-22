


(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    chrome.runtime.onMessage.addListener((obj, _sender, _response) => {
        const { type, _value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const waveBtnExists = document.getElementsByClassName("wave-btn")[0];

        if (!waveBtnExists) {
            const waveBtn = document.createElement("img");

            waveBtn.src = chrome.runtime.getURL("assets/infinite-loop.png");
            waveBtn.className = "ytp-button " + "wave-btn";
            waveBtn.title = "Click to start volume wave";
            waveBtn.style.width = "80px"
            waveBtn.style.marginRight = "15px"

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.append(waveBtn);
            waveBtn.addEventListener("click", wave);
        }
    }

})();


function wave() {
    let Vid = document.querySelector('video');
    Vid.volume = 0;
    let increase = true;

    setInterval(function () {
        if (Vid.volume <= 0.15 && increase === true) {
            Vid.volume += 0.01;
        } else {
            increase = false;
        }

        if (Vid.volume > 0.02 && increase === false) {
            Vid.volume -= 0.01;
        } else {
            increase = true;
        }
    }, 225);
}
