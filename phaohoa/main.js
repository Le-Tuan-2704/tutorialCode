const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#ff7f66']


var sound = {
    nhactet: new Howl({
        src: [
            './nhac_tet/HappyNewYearsDayA-VA-6926202.mp3'
        ],
        volume: 0.5,
        autoplay: true,
        loop: true,
    }),
    phaono: new Howl({
        src: [
            './nhac_tet/no_1.mp3'
        ],
        volume: 1,
    })
}



var btnMusic = document.querySelector(".button-music");
var btnSound = document.querySelector(".button-sound");
var isMusic = true;
var isSound = true;

// bật tắt nhạc
btnMusic.addEventListener("click", () => {
    if (isMusic) {
        btnMusic.style.backgroundImage = 'url("./anh/icons8-no-music-30.png")';
        sound.nhactet.volume('0');
    } else {
        btnMusic.style.backgroundImage = 'url("./anh/icons8-music-30.png")';
        sound.nhactet.volume('0.5');
    }
    isMusic = !isMusic;
})
// bật tắt âm thanh
btnSound.addEventListener("click", () => {
    if (isSound) {
        btnSound.style.backgroundImage = 'url("./anh/icons8-no-audio-50.png")';
    } else {
        btnSound.style.backgroundImage = 'url("./anh/icons8-audio-50.png")';
    }
    isSound = !isSound;
})

//Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})


addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const gravity = 0.02 // trọng lực
const friction = 0.99 // ma sát

// Objects
class Particle {
    constructor(x, y, radius, color, velocity) {
        // vị trí chấm pháo hoa
        this.x = x;
        this.y = y;
        // bán kính chấm pháo hoa
        this.radius = radius;
        // màu sắc
        this.color = color;
        // vận tốc
        this.velocity = velocity;
        // mờ dần và xóa
        this.alpha = 1;
    }

    draw() {
        c.save()
        // làm mờ
        c.globalAlpha = this.alpha
        // bắt đầu vẽ
        c.beginPath();
        // vẽ hình tròn
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // chọn màu
        c.fillStyle = this.color
        // vẽ
        c.fill()
        // kết thúc vẽ
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction // cập nhập lại vận tốc đi ngang của điểm pháo
        this.velocity.y *= friction // cập nhập lại vận tốc đi xuống của điểm pháo
        this.velocity.y += gravity // cập nhập lại vận tốc đi xuống của điểm pháo
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005
    }
}

// Implementation
let particles
function init() {
    particles = [];
}

// Animation Loop
function animate() {
    // đệ quy
    requestAnimationFrame(animate)
    // màu cho thẻ canvas
    c.fillStyle = 'rgba(0, 0, 0, 0.05)'
    // vẽ  hình chữ nhật = kích thước màn hình
    c.fillRect(0, 0, canvas.width, canvas.height)
    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update()
        } else {
            particles.splice(i, 1)
        }
    });
}


//Event Click
addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    if (isSound) {
        sound.phaono.play();
    }
    const particleCount = 400;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 8;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }))
    }

})

init();
animate();