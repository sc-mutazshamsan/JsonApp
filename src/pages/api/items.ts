// src/pages/api/items.ts
import { NextApiRequest, NextApiResponse } from "next";

const guidList = [
  "f3cad3c9-9211-43f5-a178-57d13ab437de",
  "c72d4349-f15d-4d7c-ae0a-2fc79c3fb22a",
  "a0341fb1-b9fd-4f31-b9ee-4430913bfc38",
  "dc1ce19f-3135-4375-9704-d55b576d95b4",
  "2a2e0329-d604-436e-acd4-325c6a11076c",
  "db6cedf2-e344-476b-97bd-0d6db2f7c96c",
  "b01c1eef-fe48-4bdd-bfac-f80af164e1b9",
  "32ea10bb-8d2d-4fb6-9798-6d2bfd76e955",
  "2d493adc-44ef-4231-bf1c-10ac273ddac5",
  "87bc5504-0193-4335-9a27-4c9f6012d0d9",
  "7f5eeecd-7ac6-4da9-b041-c11068c6dbc1",
  "ac556670-3b8f-4de6-bf52-bac51ab4c8dc",
  "a5c7df5a-8b28-4a74-961a-19deb126d641",
  "88ed28d2-8fcc-4954-b02b-2e920577a555",
  "85f835f2-e981-4fc3-889f-84c5b757b57b",
  "c983390c-450f-4dbf-b9d9-c22e4be3bb96",
  "d137828b-05b1-4a04-90c1-af686814236f",
  "84f2f426-6ab3-41a3-9b90-0402d3e14b65",
  "6c30143b-bca2-48dd-b683-1e1b184fb78a",
  "a91f59b1-8ecd-4a6c-9261-85b5dc275971",
  "658171e9-ecd3-40a0-a648-f2471d7968ca",
  "c78f65ae-819e-4d58-a93a-32fc33f1477b",
  "0c932596-4318-4672-961b-7a5a9be98d15",
  "fbec502d-f66a-4b04-8682-e7517da4e8af",
  "e1055288-d220-4a68-b83d-d2ed5c41a262",
  "0dbbaccb-9c80-4cbe-8c17-2294c5ae8302",
  "f3aad364-a3a0-4544-9edf-ef687c7efb0c",
  "3b57ff80-480c-489e-9b68-81926f476cc8",
  "7eb79c93-faaf-42d2-81f3-8515b9d00750",
  "895812bd-ea08-4fb0-94b0-e5738e6c8dce",
  "605d1cc2-8bb5-486b-b317-7c906033f06f",
  "c3c80ec2-c6a1-44f2-aaaf-9494b58dbb3b",
  "9d59fd4e-b12c-4e33-b908-1477ace326ed",
  "0d64da97-b2b7-4cc5-9e03-339f708a74f6",
  "ade1d421-b348-4e49-b0fc-557b28de1b72",
  "91227367-b4c9-4543-9e87-689ac8af9422",
  "e471f9dd-2f04-4e8a-8d03-6a0394604bbc",
  "a497a136-d32b-4f90-92a8-558c226c207d",
  "f613da06-215a-4a13-a0ac-4ef68e41025e",
  "305c2f9d-57c4-4720-950f-4ac38d577deb",
  "91921284-ca0b-4a48-b8c2-fb6fa617f627",
  "ddf538cc-5360-4b8e-b7f6-8208758899cb",
  "10a38c4a-f1aa-4e15-81b9-0a8259b94948",
  "54083a11-c6dc-4b88-916f-730fa3d0fbde",
  "4950a37f-e491-40f5-8ce7-45408c549202",
  "6aa920a1-df7d-4645-8dc9-aff09ad4073a",
  "c58ff6c0-632b-4d72-a51c-82d1d5a1134c",
  "a454e226-343b-4a6e-9816-b059cc26672e",
  "8a5283aa-3d25-4f93-9a21-23bda246c317",
  "dfa0ea9f-f2f4-4204-8e54-9e423278bfe0",
  "2b478998-b468-4bd3-b696-5b72acd96894",
  "b543776d-2971-4f3e-9eaf-f15591e3e0e0",
  "9e1b2fa7-3526-4a95-b540-949d1145a104",
  "03df5060-1359-423e-9aa5-8a62d41f902b",
  "6e890149-1327-451f-a0f4-84e32a38fb50",
  "2fbcc0ca-2cba-4159-8a50-3f830ba63015",
  "56c602b5-675b-416a-ab2f-7125fa39c9e2",
  "6b0fe606-1c80-415f-92c5-ef9079dadf1f",
  "d18c7934-783b-4e4d-923f-c24a4eb7ba3b",
  "ac0f3b50-80d2-4990-96ed-059d82168336",
  "76d5bd9c-843e-4275-a812-3192427fe836",
  "f5b9e705-27e5-4ae9-996f-1e0a41da2531",
  "25be7327-a895-460b-accd-512619317e7e",
  "68af7efe-57ec-4a29-be50-c0d016f1c834",
  "f2c6a85c-d125-42cb-beb9-38ed5158af5a",
  "92aa31f7-d0d6-4c62-bb06-a443dab65df6",
  "213e35b6-a515-414d-ad33-adf9965a8af2",
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

  for (let i = 1; i <= count; i++) {
    items.push({
      id: guidList[i],
      name: `Item ${i}`,
      url: `${baseUrl}Item${i}`,
      locale: i % 2 === 0 ? "en-us" : "ar-ae",
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
