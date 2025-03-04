import "@testing-library/jest-dom";
import mongoose from "mongoose";
import dbConnect from "../dbConnect";

jest.mock("mongoose");
const mockedMongoose = mongoose as jest.Mocked<typeof mongoose>;

describe("dbConnect", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it("should successfully connect to the database", async () => {
    mockedMongoose.connect.mockResolvedValue({
      connection: { readyState: 1 },
    } as any);

    const db = await dbConnect();

    expect(db.connection.readyState).toEqual(1);
    expect(mockedMongoose.connect).toHaveBeenCalledTimes(1);
  });

  it("should cache the database connection", async () => {
    const conn1 = await dbConnect();
    const conn2 = await dbConnect();

    // Was called once in previous test...
    expect(mockedMongoose.connect).toHaveBeenCalledTimes(0);
    expect(conn1).toBe(conn2);
  });
});
