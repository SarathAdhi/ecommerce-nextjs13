import { uuid as _uuid } from "short-uuid";
import ShortUniqueId from "short-unique-id";

export const uuid = () => _uuid();

export const puuid = new ShortUniqueId({ length: 6 });
