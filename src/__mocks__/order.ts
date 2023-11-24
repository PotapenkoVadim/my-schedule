import { OrderType } from "@/types";

export const ordersMockData: Array<OrderType> = [
  {
    "id": "1688309101651",
    "color": "3700ad",
    "customer": "Dy Bless",
    "set": "Arcane",
    "deadline": [
      "2023-01-09T21:00:00.000Z",
      "2023-01-11T21:00:00.000Z"
    ],
    "comment": "",
    "done": false,
    "ready": false,
    "details": [
      {
        "count": 3,
        "description": "замена фона",
        "sum": 2400
      }
    ]
  },
  {
    "id": "1688311890288",
    "color": "f0ed93",
    "customer": "Н.Викулова",
    "set": "Сейлор сложное",
    "deadline": [
      "2023-01-02T21:00:00.000Z",
      "2023-01-05T21:00:00.000Z"
    ],
    "comment": "",
    "done": false,
    "ready": false,
    "details": [
      {
        "count": 1,
        "description": "биг панорама",
        "sum": 2000
      }
    ]
  }
];