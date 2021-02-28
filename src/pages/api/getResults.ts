import { NextApiRequest, NextApiResponse } from 'next';

export default async function getResults(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;
  const response = await fetch(
    encodeURI(
      `${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_ENDPOINT}?team=${query.team}&person=${query.person}&date=${query.date}`,
    ),
  );
  const json = await response.json();
  res.end(JSON.stringify(json));
}
