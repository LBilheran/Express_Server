let url1 = "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1";
let url2 = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const ctx = document.getElementById('myChart');
let promises = [];

let val_bitcoin = fetch(url1)
.then(res => res.json())
.then(data => {
    return {
        valeur: data.data.map(value => value.priceUsd),
        dates: data.data.map(value => value.date),
    }
});

promises.push(val_bitcoin);

let USD_to_EUR = fetch(url2)
.then(res => res.json())
.then(data => data.usd.eur);

promises.push(USD_to_EUR);

Promise.all(promises)
.then(promises => {
    new Chart(ctx, {
        type: 'line',
        data: {
          labels: promises[0].dates.map(value => value.substr(0, 10)),
          datasets: [{
            label: 'Values',
            data: promises[0].valeur.map(value => value * promises[1]),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
})

let canvas = document.getElementById('canvasImages');
let taille = 300;
canvas.width = canvas.heigth = taille;
let ctx2 = canvas.getContext('2d');

function combineImages(urls) {
    urls = urls.map(url => {
        return new Promise((resolve,reject) => {
            let fullURL = `https://raw.githubusercontent.com/alrra/browser-logos/master/src/${url}/${url}_128x128.png`;
            let img = new Image();
            img.src = fullURL;
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                resolve(img);
            }
        });
    });

    return Promise.all(urls)
        .then(images => {
            images.forEach(img => {
            ctx2.drawImage(img, Math.random() * (taille - 128), Math.random() * (taille - 128));
        });
        return canvas.toDataURL(); 
        });
}

let urls = ['chrome', 'firefox', 'edge', 'safari', 'opera', 'brave'];

combineImages(urls).then(images => {
    document.documentElement.style.backgroundImage = `url(${images})`;
});



