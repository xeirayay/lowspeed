/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-motor-1',
    name: 'Honda Vario - Led Old',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-ef90ed37-aebd-4739-9999-0c2474296a63.png',
      'https://cdn.phototourl.com/member/2026-06-20-bbc02b65-59ce-49bc-8997-f61dfcd28687.png',
      'https://cdn.phototourl.com/member/2026-06-21-522c27d3-0e63-4454-9c84-e1813abcc8a1.png',
      'https://cdn.phototourl.com/member/2026-06-21-2baf6834-0efa-4f8f-870e-a3d5916978b7.jpg'
    ],
    createdAt: Date.now() - 1
  },
  {
    id: 'prod-motor-2',
    name: 'Honda Vario - Gen 1',
    category: 'Motor',
    price: 50000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-21-8c1c7008-deaf-4ea9-815a-06c007f50247.png',
      'https://cdn.phototourl.com/member/2026-06-21-b9df2391-1ea0-44e9-9347-e0d73fe91ebc.png',
      'https://cdn.phototourl.com/member/2026-06-21-6dc912a2-ca70-4055-af5a-1caab1f677cb.png',
      'https://cdn.phototourl.com/member/2026-06-21-31004063-d2d6-4546-aa36-f13406a5dd83.png',
      'https://cdn.phototourl.com/member/2026-06-21-2551d7c0-b68e-4b78-ab82-cb3e8dd7e3ab.png',
      'https://cdn.phototourl.com/member/2026-06-21-97d3328d-fbbe-476d-9c29-d987efc2a054.jpg'
    ],
    createdAt: Date.now() - 2
  },
  {
    id: 'prod-motor-3',
    name: 'Honda Vario - Gen 2',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-21-32c71161-9b8f-4a1e-b620-f7897ee69767.png',
      'https://cdn.phototourl.com/member/2026-06-21-4336edb8-b704-4fed-b38a-ceecbb60f94c.png',
      'https://cdn.phototourl.com/member/2026-06-21-6e52ecaf-8efe-48b9-a842-3925ca3095c4.png',
      'https://cdn.phototourl.com/member/2026-06-21-3cc5539e-10b2-4022-8dd2-f5b3d9e88d2c.png',
      'https://cdn.phototourl.com/member/2026-06-21-a1a0707d-5b42-4b38-9bab-bc1fdcad527b.png',
      'https://cdn.phototourl.com/member/2026-06-21-56dcf92a-a6a1-47d7-8337-0d30245d5d81.png',
      'https://cdn.phototourl.com/member/2026-06-21-a922af4a-4a74-4737-baac-8ae0ce22e921.jpg'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-motor-4',
    name: 'Honda Vario - Kzr',
    category: 'Motor',
    price: 60000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 2,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-b6a07092-a7f8-4d63-833a-47c4633ea2ad.png',
      'https://cdn.phototourl.com/member/2026-06-20-246a2d70-f92f-4c4d-9857-ec937c4f0711.png',
      'https://cdn.phototourl.com/member/2026-06-20-248647b3-3452-45e9-8fc9-a60d15356c8c.png',
      'https://cdn.phototourl.com/member/2026-06-20-6d38651b-5fbb-4060-8e18-eb5258b62e7f.png',
      'https://cdn.phototourl.com/member/2026-06-20-0ac99173-a3e1-410e-8feb-ebaf0d04c1cb.png',
      'https://cdn.phototourl.com/member/2026-06-20-05aae7df-9765-4b9f-af91-b2878cd3f545.png',
      'https://cdn.phototourl.com/member/2026-06-20-ec76b7ec-a51a-4265-bb0e-e03983d52d30.png'
    ],
    createdAt: Date.now() - 60000
  },
  {
    id: 'prod-motor-5',
    name: 'Honda Beat',
    category: 'Motor',
    price: 20000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 3,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-1318cfdd-7daa-4a27-bf12-3d83b0b0a1db.png',
      'https://cdn.phototourl.com/member/2026-06-21-9abd20bd-d1f8-4df9-bed4-dbe3a292bb3b.png',
      'https://cdn.phototourl.com/member/2026-06-20-c204c673-100e-43ae-84ab-19f4812aeab5.png',
      'https://cdn.phototourl.com/member/2026-06-21-f7e3a2dc-3063-4ef5-bc76-a4d5ed742211.png',
      'https://cdn.phototourl.com/member/2026-06-21-370e83cc-20aa-4d5d-bbbb-ac44457ca26e.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-motor-6',
    name: 'Honda Stylo',
    category: 'Motor',
    price: 20000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-89295df1-330e-45b3-a692-d8e504e3ff88.png',
      'https://cdn.phototourl.com/member/2026-06-20-34013617-3a93-4b07-931e-bbb12e577910.png',
      'https://cdn.phototourl.com/member/2026-06-20-4948e39e-87fb-46f1-9ba6-a97cebba0a8e.png',
      'https://cdn.phototourl.com/member/2026-06-20-1d916815-5ff7-4ee9-8ee2-0cefd6c65078.png',
      'https://cdn.phototourl.com/member/2026-06-21-2a37d9d5-a8fd-4b51-8170-ad58abd16e4c.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-motor-7',
    name: 'Honda CBR - 250RR',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-86012d8d-6a42-4e50-9287-092114b8a1ab.png',
      'https://cdn.phototourl.com/member/2026-06-20-59024e3b-84c0-4692-9d11-c5e5b1f30782.png',
      'https://cdn.phototourl.com/member/2026-06-20-b15ffc38-f80c-4614-8af4-17cc216cabef.png',
      'https://cdn.phototourl.com/member/2026-06-20-72deb1ef-9e0b-4203-bc85-5b2fbc7a1699.png',
      'https://cdn.phototourl.com/member/2026-06-21-d450b9a0-40a6-47c7-b9bc-4e5697e6cf91.jpg'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-motor-8',
    name: 'Honda Scoopy',
    category: 'Motor',
    price: 10000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-7afca51c-11e7-4a89-b6f4-7e38a09df295.png',
      'https://cdn.phototourl.com/member/2026-06-20-34bc76d4-30fd-448d-9516-67e64e6f1cf7.png',
      'https://cdn.phototourl.com/member/2026-06-20-2b1d5314-ecb0-413e-a1e4-ee7c5ba5f70f.png',
      'https://cdn.phototourl.com/member/2026-06-20-3f5acd64-da9c-4e54-ad47-6ca524d561f6.png',
      'https://cdn.phototourl.com/member/2026-06-21-08c1d57e-dd06-47fa-8c05-94d21b9da3b1.jpg'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-motor-9',
    name: 'Honda Pcx - 150',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-623d345f-5472-4f58-94de-87bcd6f78c5e.png',
      'https://cdn.phototourl.com/member/2026-06-20-04f8b50c-4eec-4e3b-a583-5e106cd4be85.png',
      'https://cdn.phototourl.com/member/2026-06-20-b3169384-c20d-458b-9634-ddb55649d0dc.png',
      'https://cdn.phototourl.com/member/2026-06-20-561169df-f511-4173-8693-b6e16b7d3e7c.png',
      'https://cdn.phototourl.com/member/2026-06-20-562cc735-a732-4cda-8f45-001a4b61ed1f.png',
      'https://cdn.phototourl.com/member/2026-06-20-c37747c6-a559-4e03-b3f6-b90f895effd8.png',
      'https://cdn.phototourl.com/member/2026-06-21-0f1267c9-17d8-42be-9f74-b7925f00e3cb.jpg'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-motor-10',
    name: 'Yamaha Aerox New - V1',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-b2aeba23-581f-485c-bb17-19b7b4fa1956.png',
      'https://cdn.phototourl.com/member/2026-06-21-396504b6-1e3c-42a3-9f53-54a9fffbb524.png',
      'https://cdn.phototourl.com/member/2026-06-21-a827a54d-5484-468e-8ac4-c61526a77a03.png',
      'https://cdn.phototourl.com/member/2026-06-20-4c403252-6c64-4f15-840a-561f90d85f5f.png',
      'https://cdn.phototourl.com/member/2026-06-21-1c1c09bb-8721-47e1-8fba-27677c3b35c4.jpg'
    ],
    createdAt: Date.now() - 100000000
  },
  {
    id: 'prod-motor-11',
    name: 'Yamaha Aerox New - V2',
    category: 'Motor',
    price: 30000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-2624c22f-7bea-4530-9f9e-43138884fcf4.png',
      'https://cdn.phototourl.com/member/2026-06-20-8723475e-b4e4-4f87-8444-8a51a553fb12.png',
      'https://cdn.phototourl.com/member/2026-06-20-a960adf8-ca17-4cd1-86d2-70fc23a35114.png',
      'https://cdn.phototourl.com/member/2026-06-20-5527b7d3-403b-4523-b39c-9902bfb5cb3b.png',
      'https://cdn.phototourl.com/member/2026-06-20-f0f72506-acae-40a5-b5d5-79bd8a4b726f.png',
      'https://cdn.phototourl.com/member/2026-06-20-305ec99f-03e9-40f0-8886-008ad5998869.png',
      'https://cdn.phototourl.com/member/2026-06-20-56086a6a-1b4b-4173-bed0-ba23ecebcb21.png',
      'https://cdn.phototourl.com/member/2026-06-20-27ee0308-ffa2-4794-9247-9f9021182111.png',
      'https://cdn.phototourl.com/member/2026-06-21-a6358150-e15c-4ba5-b87d-7bd7cce6de5f.jpg'
    ],
    createdAt: Date.now() - 100000000
  },
  {
    id: 'prod-motor-12',
    name: 'Yamaha Aerox - Old',
    category: 'Motor',
    price: 40000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 2,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-ee442c05-f4d5-4d21-bc94-b0ccc5e5fa5c.png',
      'https://cdn.phototourl.com/member/2026-06-20-885a5e42-0d61-4e22-b5a9-646aade72799.png',
      'https://cdn.phototourl.com/member/2026-06-21-e4b9f33d-7c48-49d9-b19a-4379e36c4bcc.png',
      'https://cdn.phototourl.com/member/2026-06-20-ea4d3113-5311-49be-ab52-89a1fc6c4b2b.png',
      'https://cdn.phototourl.com/member/2026-06-20-3c000ebe-bcc9-454d-ab69-8497ef83cfb9.png',
      'https://cdn.phototourl.com/member/2026-06-20-88cb7535-cf77-4c86-ad41-c1425c6c3a7d.png',
      'https://cdn.phototourl.com/member/2026-06-21-d2dc3d0e-122c-4e07-a681-37e46cac5385.jpg'
    ],
    createdAt: Date.now() - 40000
  },
  {
    id: 'prod-motor-13',
    name: 'Yamaha Mio Sporty - V1',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 3,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-bab35ec5-12ef-4af9-a6ab-1087a27d38b5.png',
      'https://cdn.phototourl.com/member/2026-06-20-43162bb4-7a01-41fc-9aac-8ffcdb1ca8fc.png',
      'https://cdn.phototourl.com/member/2026-06-20-3ae46ffb-8814-4f48-b3fd-6319a1a62037.png',
      'https://cdn.phototourl.com/member/2026-06-20-d773d804-467c-4b40-a8ff-bab4cbaeb740.png',
      'https://cdn.phototourl.com/member/2026-06-20-4de11a8f-2267-4180-a4e7-3d934694eedf.png',
      'https://cdn.phototourl.com/member/2026-06-20-a8253af7-aea5-4dde-8b0d-47adba7d9ba9.png',
      'https://cdn.phototourl.com/member/2026-06-21-1d5d8552-12a1-4824-b4ff-e76d75d62803.jpg'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-motor-14',
    name: 'Yamaha Mio Sporty - V2',
    category: 'Motor',
    price: 20000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-42f654ba-19f2-4759-8201-a3eca19c33d3.png',
      'https://cdn.phototourl.com/member/2026-06-20-4052fe29-bcaa-4b59-8a4f-256af0784f51.png',
      'https://cdn.phototourl.com/member/2026-06-20-30a1da04-2631-4cbc-8722-47c240e2e004.png',
      'https://cdn.phototourl.com/member/2026-06-20-e3b3b029-b43d-4e17-8fda-bb8b9fb961f2.png',
      'https://cdn.phototourl.com/member/2026-06-20-0f452fcc-3571-49a2-9254-29d9a51995c2.png',
      'https://cdn.phototourl.com/member/2026-06-20-43efb8be-724f-4495-b9b3-698ee4b1d47e.png',
      'https://cdn.phototourl.com/member/2026-06-20-7ee3b7fc-28ef-493d-96a6-4bac6a0aa582.png',
      'https://cdn.phototourl.com/member/2026-06-20-8cb698e1-1cce-4acd-b937-e684a06520ad.png',
      'https://cdn.phototourl.com/member/2026-06-21-1e35595f-7aa3-4faf-a5e8-2e64ed1813df.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-motor-15',
    name: 'Yamaha Mio - Soul MX',
    category: 'Motor',
    price: 50000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-21-1bbd6f75-b706-4fa3-95ef-ebb740c21792.png',
      'https://cdn.phototourl.com/member/2026-06-21-56ed4aa1-2223-4a7e-817c-9477be30dfc4.png',
      'https://cdn.phototourl.com/member/2026-06-21-0b15e9e8-205b-4580-839c-e4ae59b9cb2d.png',
      'https://cdn.phototourl.com/member/2026-06-21-9c93fbaa-442e-453e-96b4-bb56879fb401.png',
      'https://cdn.phototourl.com/member/2026-06-21-3bad50bb-40b1-4e71-b607-9586d0dd6af5.png',
      'https://cdn.phototourl.com/member/2026-06-21-064c558c-4cbe-43b4-a010-648d3763790e.png'
    ],
    createdAt: Date.now() - 50000
  },
  {
    id: 'prod-motor-16',
    name: 'Yamaha Xmax',
    category: 'Motor',
    price: 25000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-b878816b-fec7-4202-87ce-d98f6226d903.png',
      'https://cdn.phototourl.com/member/2026-06-20-231d1a72-f622-4300-b59b-93229348bb3c.png',
      'https://cdn.phototourl.com/member/2026-06-20-9b1e4456-9aa5-40c7-876a-a464b4d1d341.png',
      'https://cdn.phototourl.com/member/2026-06-20-3c07f768-96e5-4a8b-8b2c-f33cc9b1b1f0.png',
      'https://cdn.phototourl.com/member/2026-06-21-9e81039f-d28b-4797-90b3-58ff74ae5d61.jpg'
    ],
    createdAt: Date.now() - 100000000
  },
  {
    id: 'prod-motor-17',
    name: 'Yamaha R - 15',
    category: 'Motor',
    price: 15000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-faa41496-71de-4b3d-ae26-499ed1c153c1.png',
      'https://cdn.phototourl.com/member/2026-06-20-711d49ce-7a1f-4851-bd06-48e7288cec14.png',
      'https://cdn.phototourl.com/member/2026-06-20-957c8659-45d5-4a96-9c11-5ed3da8b1fad.png',
      'https://cdn.phototourl.com/member/2026-06-20-cb3ac34c-3605-4ae5-9009-c5412082d892.png',
      'https://cdn.phototourl.com/member/2026-06-21-4060b425-ce9d-43ea-94f5-8a58a3386fae.png'
    ],
    createdAt: Date.now() - 15000
  },
  {
    id: 'prod-motor-18',
    name: 'GL - Rangka Bebas',
    category: 'Motor',
    price: 10000,
    description: 'Deskripsi Model Ada Di Slide Foto Terakhir',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-7d5bce64-4151-41e4-a0ff-d2d98829a514.png',
      'https://cdn.phototourl.com/member/2026-06-20-c0aaf944-d2cc-4874-a796-d531840ee7cc.png',
      'https://cdn.phototourl.com/member/2026-06-20-fa4e96ed-9bed-40bc-a681-433391018ef4.png',
      'https://cdn.phototourl.com/member/2026-06-20-5eecf2c0-5941-4476-bd2c-04027f82d9e9.png',
      'https://cdn.phototourl.com/member/2026-06-20-62f788de-59d6-4336-b3e0-05e64fa7d93d.png',
      'https://cdn.phototourl.com/member/2026-06-21-510f5f34-265e-4edc-861c-7972f49ba143.png'
    ],
    createdAt: Date.now() - 100000000
  },  
  {
    id: 'prod-partm-1',
    name: 'Shockbreaker Shafer',
    category: 'Part Motor',
    price: 20000,
    description: 'Universal All Motor.',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-caebdaf8-3d57-4b63-9825-f312b94bfc7e.png'
    ],
    createdAt: Date.now() - 20000
  },
     {
    id: 'prod-partm-2',
    name: 'Handgrip Daytona Set Jalu Cnc',
    category: 'Part Motor',
    price: 10000,
    description: 'Universal All Motor.',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-6a24c0de-a725-492e-8e36-732ab6250063.png'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-3',
    name: 'Frameplate Cnc Shijiro',
    category: 'Part Motor',
    price: 10000,
    description: 'Universal All Motor.',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-925bdc01-2eea-4263-a428-81b18f5e92da.jpg'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-4',
    name: 'Saklar Vixion',
    category: 'Part Motor',
    price: 10000,
    description: 'Universal All Motor ( bukan buat motor yang saklarnya nyatu )',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-ea09a8a7-4ede-406c-94e3-334141716c64.jpg'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-5',
    name: 'Billed Hypervision Project - X',
    category: 'Part Motor',
    price: 35000,
    description: 'Fit ke motor yang space headlamp nya besar ( seperti vario, nmax, pcx, dll )',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-4a0cc7f2-a9c2-4f34-9d06-4a89f1240f52.png',
      'https://cdn.phototourl.com/free/2026-06-16-6da4be3b-7834-439b-b6a8-d022ed96bad9.png',
      'https://cdn.phototourl.com/member/2026-06-20-cf8ed9e0-f328-40c7-a045-c1b86d82b23a.png'
    ],
    createdAt: Date.now() - 35000
  },
  {
    id: 'prod-partm-6',
    name: 'Behel Titanium',
    category: 'Part Motor',
    price: 25000,
    description: 'Untuk Motor Vario',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/free/2026-06-16-e379bc42-b10e-4c7c-bd92-fb0e45a01a86.png'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-partm-7',
    name: 'Bordes Titanium Shijiro',
    category: 'Part Motor',
    price: 10000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-16-6d783595-fc6b-4ace-afb8-10aba16badb5.jpg'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-8',
    name: 'Arm Tzm Titanium',
    category: 'Part Motor',
    price: 25000,
    description:  'Untuk Motor Vario',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-16-65ef9be8-d33c-4b1e-9e99-4710ac4299cf.png'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-partm-9',
    name: 'Knalpot Dsl Kenochi',
    category: 'Part Motor',
    price: 25000,
    description: 'Universal ( breket bisa digeser ) & dapet versi burn titanium',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-21-69e32ff6-8d81-401d-bbd5-d9fdfe3fd194.png',
      'https://cdn.phototourl.com/member/2026-06-21-010098c8-9840-4172-bda5-852283e3574e.png',
      'https://cdn.phototourl.com/member/2026-06-21-c1f0b447-e2d6-4f95-9f47-733f4cbc0237.png'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-partm-10',
    name: 'Knalpot Ox2',
    category: 'Part Motor',
    price: 10000,
    description: 'Untuk Vario Non Arm',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-ed10ad6f-a075-47c5-a8a4-b344fc7ac1e0.png',
      'https://cdn.phototourl.com/member/2026-06-20-2ed62f44-671c-450a-801f-fcc4dba61ef3.png'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-11',
    name: 'Formula Semi Samlong Titanium Sunblast ',
    category: 'Part Motor',
    price: 30000,
    description: 'Untuk Motor Vario',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-16-523998f7-dd7d-4387-abcc-7a69b61cbce7.png',
      'https://cdn.phototourl.com/member/2026-06-20-898b8807-8e52-4874-8ead-0cc769a568d1.png'
    ],
    createdAt: Date.now() - 30000
  },
  {
    id: 'prod-partm-12',
    name: 'Knalpot Formula Semi Sunburn',
    category: 'Part Motor',
    price: 10000,
    description: 'Untuk Motor Vario',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-16-ddbe7595-d350-4d66-a265-bd47d713dc0a.png',
      'https://cdn.phototourl.com/member/2026-06-16-2e1810df-49e9-4053-80b6-0d9ad9b44d66.png'
    ],
    createdAt: Date.now() - 10000
  },
  {
    id: 'prod-partm-13',
    name: 'Drs Type Viola Style',
    category: 'Part Motor',
    price: 15000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-b3b12dcd-21a4-481c-aef8-785f840ff793.png',
      'https://cdn.phototourl.com/member/2026-06-17-f0e2bf19-f973-4d13-9d8a-dd2089197a65.png',
      'https://cdn.phototourl.com/member/2026-06-17-6f2caefa-f9d0-4d4b-9f74-77c7594204f0.png',
      'https://cdn.phototourl.com/member/2026-06-20-263d23ff-9747-4c7e-9ce3-a0af5c709283.png'
    ],
    createdAt: Date.now() - 15000
  },
  {
    id: 'prod-partm-14',
    name: 'Erm Type Thailand Titanium',
    category: 'Part Motor',
    price: 25000,
    description: 'Universal Matic ( Breket Bisa Digeser )',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-5f23ebde-eb54-4b2d-b739-e14a3b97a3d1.png',
      'https://cdn.phototourl.com/member/2026-06-17-ee7f9d45-b4e5-4304-80b4-c59ba07f7ec1.png',
      'https://cdn.phototourl.com/member/2026-06-20-2db308d2-dfc5-45c4-b9b2-291d9183729d.png',
      'https://cdn.phototourl.com/member/2026-06-17-b3bf017c-56db-4047-b0aa-e177b49670c2.png'
    ],
    createdAt: Date.now() - 25000
  },
  {
    id: 'prod-partm-15',
    name: 'Arm Nusantara',
    category: 'Part Motor',
    price: 30000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-17-037eec33-454b-4f19-a932-c9e25de55310.jpg'
    ],
    createdAt: Date.now() - 30000
  },
  {
    id: 'prod-partm-16',
    name: 'Rseven Non Samlong',
    category: 'Part Motor',
    price: 20000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-8f05cfce-31a8-4a50-a006-4744b206a109.png',
      'https://cdn.phototourl.com/member/2026-06-18-b0d4c62b-3156-45e0-bfbb-8a6fa281f455.png',
      'https://cdn.phototourl.com/member/2026-06-20-082f2176-2df6-4d29-a8cf-375141b37193.png',
      'https://cdn.phototourl.com/member/2026-06-18-9b65ec70-81b6-43e8-84f1-6e90d16e6b08.png'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-17',
    name: 'Brembo Rcs - 19 Corsa Corta',
    category: 'Part Motor',
    price: 15000,
    description: 'Universal Matic',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-bc178fd1-6312-417a-b801-46568083b8ff.jpg',
      'https://cdn.phototourl.com/member/2026-06-21-dd48cc27-c751-438f-9e48-531f4fcf6a05.jpg'
    ],
    createdAt: Date.now() - 15000
  },
  {
    id: 'prod-partm-18',
    name: 'Kaliper Aurora Nickel + Breket Kiri',
    category: 'Part Motor',
    price: 20000,
    description: 'Universal',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-5012290c-0b26-47c6-a27b-e61eed259063.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-19',
    name: 'Jok Nathong Thailand Vario',
    category: 'Part Motor',
    price: 20000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-c5cc54fa-6c69-443d-83ef-3a1d5cd6141f.png'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-20',
    name: 'Jok Nathong Papas Aerox',
    category: 'Part Motor',
    price: 20000,
    description: 'Untuk All Motor Aerox',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-fe62d10c-3316-4f69-9722-0eb2d16e4ebe.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-21',
    name: 'Jok 3D Panda',
    category: 'Part Motor',
    price: 15000,
    description: 'Untuk Motor Vario',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-5a68e381-d5a3-4f90-8959-98154edac110.jpg',
      'https://cdn.phototourl.com/member/2026-06-18-3545407f-3c7c-4ca7-aabc-8f3a0644da11.jpg',
      'https://cdn.phototourl.com/member/2026-06-18-0e726d03-a9dc-426a-bf21-3859515506b1.jpg'
    ],
    createdAt: Date.now() - 15000
  },
  {
    id: 'prod-partm-22',
    name: 'Mesin Vario',
    category: 'Part Motor',
    price: 20000,
    description: 'Sudah Include Semuanya ( Shock, Oc, Dll Yang Ada Di Foto )',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-71c236b4-b00b-48d9-a748-fe18c9fc67c2.png',
      'https://cdn.phototourl.com/member/2026-06-18-c6fa5bcd-db15-4ed5-9d64-d7dd46f2b580.png',
      'https://cdn.phototourl.com/member/2026-06-20-7319305a-42cb-4bf5-9673-4cf6a4a024e1.png',
      'https://cdn.phototourl.com/member/2026-06-20-335ff251-bf64-4233-832d-a0bc8bd86920.png'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-23',
    name: 'Velg Akront Morad - R17',
    category: 'Part Motor',
    price: 30000,
    description: 'Universal',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-20-34c0222c-6b4d-48f3-96ad-528b72e6880c.jpg'
    ],
    createdAt: Date.now() - 30000
  },
  {
    id: 'prod-partm-24',
    name: 'Velg Kingu Carbon Alloy - R17',
    category: 'Part Motor',
    price: 20000,
    description: 'Universal',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-6b4c7203-6dd9-4b61-99b1-547c7891a269.jpg',
      'https://cdn.phototourl.com/member/2026-06-20-d0564256-c449-4b9f-84fc-ddc236793d99.jpg',
      'https://cdn.phototourl.com/member/2026-06-20-ac31c0bb-b138-44c6-a964-0b9e7b209dec.jpg'
    ],
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-partm-25',
    name: 'Velg Delkevic Moz Sixstar - R14',
    category: 'Part Motor',
    price: 30000,
    description: 'Universal Matic',
    stock: 10,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-5694bbb5-789c-4ba8-9a6c-fca660af6521.png',
      'https://cdn.phototourl.com/member/2026-06-20-6ef5cc8e-d743-4831-90f6-3d376f4972ce.png',
      'https://cdn.phototourl.com/member/2026-06-18-01cc8046-dc5d-4326-aaee-f2f5a074a63d.png'
    ],
    createdAt: Date.now() - 30000
  },
  {
    id: 'prod-partm-26',
    name: 'Velg Bubut Jari Jari - R17',
    category: 'Part Motor',
    price: 20000,
    description: 'Universal',
    stock: 5,
    images: [
      'https://cdn.phototourl.com/member/2026-06-18-c907fc3f-f240-47c4-929c-8b2b6564ac13.png',
      'https://cdn.phototourl.com/member/2026-06-18-91b3dde7-5533-458e-abbf-1c6adc2dcd8b.png'
    ],
    createdAt: Date.now() - 20000
  },
  // {
  //   id: 'prod-mobil-1',
  //   name: 'BMW M3 Competition G80 Black Sapphire - Roblox Model (.rbxm)',
  //   category: 'Mobil',
  //   price: 25000,
  //   description: 'Model 3D mobil sport bertenaga tinggi BMW M3 Competition G80 Black Sapphire untuk Roblox Studio (.rbxm). Menggunakan sasis premium dengan tuning kemudi yang sangat presisi dan responsif pada map simulasi balap. Lengkap dengan detail atap serat karbon, dashboard fungsional, dan pintu fungsional.',
  //   stock: 99,
  //   images: [
  //     'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200',
  //     'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200'
  //   ],
  //   createdAt: Date.now() - 90000000
  // },
  // {
  //   id: 'prod-mobil-2',
  //   name: 'Honda Civic RS Hatchback Sonic Gray - Roblox Model (.rbxm)',
  //   category: 'Mobil',
  //   price: 20000,
  //   description: 'Model 3D Honda Civic RS Hatchback Sonic Gray Metallic siap pakai untuk Roblox Studio (.rbxm). Detail bodi eksterior sporty dengan dual exhaust pipe, spoiler aerodinamis, lampu depan LED dinamis, serta desain sasis stabil yang sangat handal untuk dikendarai di berbagai kontur jalan.',
  //   stock: 99,
  //   images: [
  //     'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200',
  //     'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200'
  //   ],
  //   createdAt: Date.now() - 85000000
  // },
  // {
  //   id: 'prod-partmobil-1',
  //   name: 'Velg BBS LM 19 inch Original Polish Finish - Roblox Part (.rbxm)',
  //   category: 'Part Mobil',
  //   price: 5000,
  //   description: 'Satu set part 3D velg legendaris BBS LM 19-inci Polish Finish dua bagian (2-piece) untuk kustomisasi roda mobil Anda di Roblox Studio (.rbxm). Memberikan kesan modifikasi racing klasik elegan kualitas tinggi.',
  //   stock: 99,
  //   images: [
  //     'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200'
  //   ],
  //   createdAt: Date.now() - 75000000
  // },
  // {
  //   id: 'prod-jasa-1',
  //   name: 'Premium Tuning & Custom Scripting Service',
  //   category: 'Jasa',
  //   price: 15000,
  //   description: 'Jasa kustomisasi script kendaraan Roblox (Tune A-Chassis, Sound Custom, Paint Job, dll.) dikerjakan langsung oleh developer berpengalaman di Discord Lowspeed. Setelah melakukan pembayaran, Anda dapat langsung melakukan klaim tiket pengerjaan di server Discord Lowspeed.',
  //   stock: 999,
  //   images: [
  //     'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=1200'
  //   ],
  //   createdAt: Date.now() - 70000000
  // }
];

export const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('lowspeed_products');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Product[];
      // Auto-migrate if local storage contains old high prices of physical vehicles
      const hasOldHighPrices = parsed.some((p: Product) => p.price > 1000000);
      if (hasOldHighPrices) {
        localStorage.setItem('lowspeed_products', JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      
      // Real-time synchronization:
      // Loop through INITIAL_PRODUCTS defined in data.ts. If they don't exist in localStorage,
      // append them. If they do exist but fields differ (meaning they were updated in data.ts),
      // update them.
      let hasChanges = false;
      const updatedList = [...parsed];

      INITIAL_PRODUCTS.forEach((initialProd) => {
        const existingIndex = updatedList.findIndex(p => p.id === initialProd.id);
        if (existingIndex !== -1) {
          const e = updatedList[existingIndex];
          const isDifferent = 
            e.name !== initialProd.name ||
            e.price !== initialProd.price ||
            e.description !== initialProd.description ||
            e.category !== initialProd.category ||
            JSON.stringify(e.images) !== JSON.stringify(initialProd.images);
          
          if (isDifferent) {
            updatedList[existingIndex] = {
              ...e,
              name: initialProd.name,
              price: initialProd.price,
              description: initialProd.description,
              category: initialProd.category,
              images: initialProd.images,
              stock: initialProd.stock
            };
            hasChanges = true;
          }
        } else {
          updatedList.push(initialProd);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem('lowspeed_products', JSON.stringify(updatedList));
        return updatedList;
      }

      return parsed;
    } catch (e) {
      console.error('Error parsing stored products', e);
    }
  }
  // If not found, initialize and return
  localStorage.setItem('lowspeed_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

export const saveProductsToStore = (products: Product[]) => {
  localStorage.setItem('lowspeed_products', JSON.stringify(products));
};
