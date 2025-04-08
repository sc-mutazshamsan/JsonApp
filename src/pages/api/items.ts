// src/pages/api/items.ts
import { NextApiRequest, NextApiResponse } from "next";

const guidList = [
  "f3cad3c9-9211-43f5-a178-57d13ab437de",
  "f3cad3c9-9211-43f5-a178-57d13ab437de",
  "a0341fb1-b9fd-4f31-b9ee-4430913bfc38",
  "a0341fb1-b9fd-4f31-b9ee-4430913bfc38",
  "2a2e0329-d604-436e-acd4-325c6a11076c",
  "2a2e0329-d604-436e-acd4-325c6a11076c",
  "b01c1eef-fe48-4bdd-bfac-f80af164e1b9",
  "b01c1eef-fe48-4bdd-bfac-f80af164e1b9",
  "2d493adc-44ef-4231-bf1c-10ac273ddac5",
  "2d493adc-44ef-4231-bf1c-10ac273ddac5",
  "7f5eeecd-7ac6-4da9-b041-c11068c6dbc1",
  "7f5eeecd-7ac6-4da9-b041-c11068c6dbc1",
  "a5c7df5a-8b28-4a74-961a-19deb126d641",
  "a5c7df5a-8b28-4a74-961a-19deb126d641",
  "85f835f2-e981-4fc3-889f-84c5b757b57b",
  "85f835f2-e981-4fc3-889f-84c5b757b57b",
  "d137828b-05b1-4a04-90c1-af686814236f",
  "d137828b-05b1-4a04-90c1-af686814236f",
  "6c30143b-bca2-48dd-b683-1e1b184fb78a",
  "6c30143b-bca2-48dd-b683-1e1b184fb78a",
  "658171e9-ecd3-40a0-a648-f2471d7968ca",
  "658171e9-ecd3-40a0-a648-f2471d7968ca",
  "0c932596-4318-4672-961b-7a5a9be98d15",
  "0c932596-4318-4672-961b-7a5a9be98d15",
  "e1055288-d220-4a68-b83d-d2ed5c41a262",
  "e1055288-d220-4a68-b83d-d2ed5c41a262",
  "f3aad364-a3a0-4544-9edf-ef687c7efb0c",
  "f3aad364-a3a0-4544-9edf-ef687c7efb0c",
  "7eb79c93-faaf-42d2-81f3-8515b9d00750",
  "7eb79c93-faaf-42d2-81f3-8515b9d00750",
  "605d1cc2-8bb5-486b-b317-7c906033f06f",
  "605d1cc2-8bb5-486b-b317-7c906033f06f",
  "9d59fd4e-b12c-4e33-b908-1477ace326ed",
  "9d59fd4e-b12c-4e33-b908-1477ace326ed",
  "ade1d421-b348-4e49-b0fc-557b28de1b72",
  "ade1d421-b348-4e49-b0fc-557b28de1b72",
  "e471f9dd-2f04-4e8a-8d03-6a0394604bbc",
  "e471f9dd-2f04-4e8a-8d03-6a0394604bbc",
  "f613da06-215a-4a13-a0ac-4ef68e41025e",
  "f613da06-215a-4a13-a0ac-4ef68e41025e",
  "91921284-ca0b-4a48-b8c2-fb6fa617f627",
  "91921284-ca0b-4a48-b8c2-fb6fa617f627",
  "10a38c4a-f1aa-4e15-81b9-0a8259b94948",
  "10a38c4a-f1aa-4e15-81b9-0a8259b94948",
  "4950a37f-e491-40f5-8ce7-45408c549202",
  "4950a37f-e491-40f5-8ce7-45408c549202",
  "c58ff6c0-632b-4d72-a51c-82d1d5a1134c",
  "c58ff6c0-632b-4d72-a51c-82d1d5a1134c",
  "8a5283aa-3d25-4f93-9a21-23bda246c317",
  "8a5283aa-3d25-4f93-9a21-23bda246c317",
  "2b478998-b468-4bd3-b696-5b72acd96894",
  "2b478998-b468-4bd3-b696-5b72acd96894",
  "9e1b2fa7-3526-4a95-b540-949d1145a104",
  "9e1b2fa7-3526-4a95-b540-949d1145a104",
  "6e890149-1327-451f-a0f4-84e32a38fb50",
  "6e890149-1327-451f-a0f4-84e32a38fb50",
  "56c602b5-675b-416a-ab2f-7125fa39c9e2",
  "56c602b5-675b-416a-ab2f-7125fa39c9e2",
  "d18c7934-783b-4e4d-923f-c24a4eb7ba3b",
  "d18c7934-783b-4e4d-923f-c24a4eb7ba3b",
  "76d5bd9c-843e-4275-a812-3192427fe836",
  "76d5bd9c-843e-4275-a812-3192427fe836",
  "25be7327-a895-460b-accd-512619317e7e",
  "25be7327-a895-460b-accd-512619317e7e",
  "f2c6a85c-d125-42cb-beb9-38ed5158af5a",
  "f2c6a85c-d125-42cb-beb9-38ed5158af5a",
];

interface Item {
  id: string;
  name: string;
  url: string;
  locale: string;
}

interface PaginatedResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  items: Item[];
}

const generateItems = (count: number, req: NextApiRequest): Item[] => {
  const items: Item[] = [];
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["host"];
  const baseUrl = `${protocol}://${host}/`;

  for (let i = 0; i < count; i = i + 2) {
    items.push({
      id: guidList[i],
      name: `Item ${i}`,
      url: `${baseUrl}en/Item${i}`,
      locale: "en_us",
    });

    items.push({
      id: guidList[i],
      name: `${i} العنصر`,
      url: `${baseUrl}ar/Item${i}`,
      locale: "ar_ae",
    });
  }
  return items;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { page = 1, limit = 10, totalItems = 100 } = req.body;
    const items = generateItems(Number(totalItems), req);

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedItems = items.slice(startIndex, endIndex);

    const response: PaginatedResponse = {
      page: Number(page),
      limit: Number(limit),
      totalItems: items.length,
      totalPages: Math.ceil(items.length / Number(limit)),
      items: paginatedItems,
    };

    res.status(200).json(response);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
