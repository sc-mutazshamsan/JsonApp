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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedResponse>
) {
  const { page = 1, limit = 10, totalItems = 100 } = req.query;
  const items = generateItems(Number(totalItems));

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const paginatedItems = items.slice(startIndex, endIndex);

  res.status(200).json({
    page: Number(page),
    limit: Number(limit),
    totalItems: items.length,
    totalPages: Math.ceil(items.length / Number(limit)),
    items: paginatedItems,
  });
}
