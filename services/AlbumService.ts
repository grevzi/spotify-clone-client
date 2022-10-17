import axios from "axios";

export interface AlbumGetAll {
  limit?: number;
  offset?: number;
  query?: string;
}

export class AlbumService {
  static _getBaseApiUrl() {
    return process.env.NEXT_PUBLIC_API_DOMAIN;
  }

  static async getAll(data: AlbumGetAll) {
    return await axios.get(
      `${AlbumService._getBaseApiUrl()}/albums/?${new URLSearchParams(
        data as Record<string, string>
      ).toString()}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
