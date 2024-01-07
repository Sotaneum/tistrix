import fetchLocal from "../../utils/fetchLocal";
import fetchRemote from "../../utils/fetchRemote";
import { ParserResult } from "../../utils/parser";

type Tag = {
  url: string;
  title: string;
  class: string;
};

export default class Tagbox {
  private _data: ParserResult[];
  constructor() {
    const sidebar = fetchLocal()?.sidebar as ParserResult;
    this._data = sidebar?.tagbox as ParserResult[];
  }

  async update() {
    const sidebar = await fetchRemote(window.location.href).then(
      ({ sidebar }) => sidebar as ParserResult
    );
    this._data = sidebar?.tagbox as ParserResult[];
  }

  get(index: number) {
    if (this._data.length <= index) {
      return undefined;
    }

    return { ...this._data[index] } as Tag;
  }

  toArray() {
    return this._data.map((_, idx) => this.get(idx)) as Tag[];
  }
}
