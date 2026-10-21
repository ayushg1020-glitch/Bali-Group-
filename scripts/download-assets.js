import fs from 'fs';
import path from 'path';
import https from 'https';

const items = [
  { url: 'https://www.baligroupsilos.com/images/logo.png', dest: 'public/images/logo.png' },
  { url: 'https://www.baligroupsilos.com/images/logo1.jpg', dest: 'public/images/logo-footer.jpg' },
  { url: 'https://www.baligroupsilos.com/images/favicon.png', dest: 'public/images/favicon.png' },
  { url: 'https://www.baligroupsilos.com/images/imgaboutus.jpg', dest: 'public/images/about-hero.jpg' },
  { url: 'https://www.baligroupsilos.com/images/flat-bottom1.jpg', dest: 'public/images/silos/flat-bottom1.jpg' },
  { url: 'https://www.baligroupsilos.com/images/flat-bottom2.jpg', dest: 'public/images/silos/flat-bottom2.jpg' },
  { url: 'https://www.baligroupsilos.com/images/silos2.jpg', dest: 'public/images/silos/hopper-bottom.jpg' },
  { url: 'https://www.baligroupsilos.com/images/silos3.jpg', dest: 'public/images/silos/feed-silos.jpg' },
  { url: 'https://www.baligroupsilos.com/images/silos4.jpg', dest: 'public/images/silos/ethanol-silos.jpg' },
  { url: 'https://www.baligroupsilos.com/images/imgabout1.png', dest: 'public/images/imgabout1.png' },
  { url: 'https://www.baligroupsilos.com/images/imgabout2.png', dest: 'public/images/imgabout2.png' },
  { url: 'https://www.baligroupsilos.com/images/imgabout3.png', dest: 'public/images/imgabout3.png' },
  { url: 'https://www.baligroupsilos.com/images/img1.jpg', dest: 'public/images/silos/detail-1.jpg' },
  { url: 'https://www.baligroupsilos.com/images/img2.jpg', dest: 'public/images/silos/detail-2.jpg' },
  { url: 'https://www.baligroupsilos.com/images/img3.jpg', dest: 'public/images/silos/detail-3.jpg' },
  { url: 'https://www.baligroupsilos.com/images/img4.jpg', dest: 'public/images/silos/detail-4.jpg' },
  { url: 'https://www.baligroupsilos.com/images/img5.jpg', dest: 'public/images/silos/detail-5.jpg' },
  { url: 'https://www.baligroupsilos.com/images/img6.jpg', dest: 'public/images/silos/detail-6.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/hl--1.jpeg', dest: 'public/images/projects/project-1.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/hl--2.jpeg', dest: 'public/images/projects/project-2.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/hl--3.jpeg', dest: 'public/images/projects/project-3.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/hl--4.jpeg', dest: 'public/images/projects/project-4.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/new-projects-img-1.jpeg', dest: 'public/images/projects/project-5.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/new-projects-img-2.jpeg', dest: 'public/images/projects/project-6.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/new-projects-img-3.jpeg', dest: 'public/images/projects/project-7.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/new-projects-img-4.jpeg', dest: 'public/images/projects/project-8.jpg' },
  { url: 'https://www.baligroupsilos.com/images/projects/new-projects-img-5.jpeg', dest: 'public/images/projects/project-9.jpg' },
  { url: 'https://www.baligroupsilos.com/images/c1.png', dest: 'public/images/clients/c1.png' },
  { url: 'https://www.baligroupsilos.com/images/c2.png', dest: 'public/images/clients/c2.png' },
  { url: 'https://www.baligroupsilos.com/images/c3.png', dest: 'public/images/clients/c3.png' },
  { url: 'https://www.baligroupsilos.com/images/c4.png', dest: 'public/images/clients/c4.png' },
  { url: 'https://www.baligroupsilos.com/images/c5.png', dest: 'public/images/clients/c5.png' },
  { url: 'https://www.baligroupsilos.com/images/c6.png', dest: 'public/images/clients/c6.png' }
];

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[OK] ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.log(`[HTTP ${res.statusCode}] ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.log(`[ERR] ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Starting download of ${items.length} assets...`);
  for (const item of items) {
    await downloadFile(item.url, item.dest);
  }
  console.log('All downloads completed!');
}

run();
