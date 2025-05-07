const displayElement = document.getElementById('display');
const startButton = document.getElementById('startButton');
const topics = [
    "子供の頃の夢",
    "最近ハマっていること",
    "忘れられない旅の思い出",
    "ちょっと自慢できること",
    "未来の自分へのメッセージ",
    "もしもタイムマシンがあったら",
    "最近感動したこと",
    "小さい頃の遊び",
    "地元の好きなところ",
    "チャレンジしてみたいこと",
    "大切な言葉や座右の銘",
    "ちょっと変わったコレクション",
];

let intervalId;
let isRunning = false;
let decelerationTimeout;

startButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        startButton.textContent = '停止中...';
        isRunning = false;

        let decelerationCount = 10; // 減速ステップ数
        let initialInterval = 50;   // 最初の切り替え間隔 (短く)
        let finalInterval = 300;    // 最後の切り替え間隔 (長く)
        let step = 0;

        const decelerate = () => {
            if (step < decelerationCount) {
                const interval = initialInterval + (finalInterval - initialInterval) * (step / decelerationCount);
                const randomIndex = Math.floor(Math.random() * topics.length);
                displayElement.textContent = topics[randomIndex];
                decelerationTimeout = setTimeout(decelerate, interval);
                step++;
            } else {
                startButton.textContent = 'スタート';
                displayElement.classList.add('spin-out'); // スピンアウトクラスを追加
                setTimeout(() => {
                    displayElement.classList.remove('spin-out'); // 少し遅れてクラスを削除
                }, 300); // スピンアウトの時間
            }
        };
        decelerate();

    } else {
        displayElement.classList.remove('spin-out'); // 開始時にスピンアウトクラスを削除
        intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * topics.length);
            displayElement.textContent = topics[randomIndex];
        }, 100);
        startButton.textContent = 'ストップ';
        isRunning = true;
    }
});