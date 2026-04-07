import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assets = [
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/1645037920_logo-jalecos-conforto.png',
    name: 'logo.png',
    folder: 'images'
  },
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/scrub_jasmin_azul_marinho_624_1_f947c620cac05dd5be22e323c1b0254e.jpeg',
    name: 'scrub-azul-marinho.jpg',
    folder: 'products'
  },
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/scrub_petala_preto_com_pink_307_1_c3f1828300708abc56c3eda27f612cbe.jpg',
    name: 'scrub-preto-pink.jpg',
    folder: 'products'
  },
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/scrub_pijama_cirrgico_feminino_clssico_bordo_burga_1_20251105203743_f1132d639f15.jpg',
    name: 'scrub-bordo.jpg',
    folder: 'products'
  },
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/scrub_pijama_cirrgico_feminino_clssico_preto_1_20251105205022_5dd2a6dadc07.jpg',
    name: 'scrub-preto.jpg',
    folder: 'products'
  },
  {
    url: 'https://images.tcdn.com.br/img/img_prod/962160/scrub_office_elegance_682_1_14b47da26bd38211d5bde491d87a897c.jpeg',
    name: 'scrub-office.jpg',
    folder: 'products'
  }
];

const publicDir = path.join(__dirname, '..', 'public');

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => reject(err));
    });
  });
}

async function main() {
  for (const asset of assets) {
    const targetFolder = path.join(publicDir, asset.folder);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    const targetPath = path.join(targetFolder, asset.name);
    console.log(`Downloading ${asset.url} to ${targetPath}...`);
    try {
      await download(asset.url, targetPath);
      console.log(`Success: ${asset.name}`);
    } catch (err) {
      console.error(`Error downloading ${asset.name}: ${err.message}`);
    }
  }
}

main();
