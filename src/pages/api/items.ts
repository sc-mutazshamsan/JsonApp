// src/pages/api/items.ts
import { NextApiRequest, NextApiResponse } from "next";

interface Item {
  id: number;
  name: string;
}

interface PaginatedResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  items: Item[];
}

const generateItems = (count: number): Item[] => {
  const items: Item[] = [];
  for (let i = 1; i <= count; i++) {
    items.push({ id: i, name: `Item ${i}` });
  }
  return items;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { page = 1, limit = 10, totalItems = 100 } = req.body;
    const items = generateItems(Number(totalItems));

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
