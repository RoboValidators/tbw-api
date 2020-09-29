import { Api } from "@types";

export const buildPaginationMeta = (
  count: number,
  page: number,
  limit: number,
  path: string
): Api.MetaResponse => {
  const pageCount = Math.ceil(count / limit);
  const next = page + 1;
  const prev = page - 1;

  return {
    meta: {
      count: limit,
      pageCount,
      totalCount: count,
      next: page >= pageCount ? null : `${path}?page=${next}&limit=${limit}`,
      previous: page <= 1 ? null : `${path}?page=${prev}&limit=${limit}`,
      self: `${path}?page=${page}&limit=${limit}`,
      first: `${path}?page=1&limit=${limit}`,
      last: `${path}?page=${pageCount}&limit=${limit}`
    }
  };
};
