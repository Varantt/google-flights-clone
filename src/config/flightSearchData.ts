import { SeatingClassField, TicketField } from "@/types/types";

export const ticketTypes: Array<TicketField> = [
  {
    id: "round-trip",
    name: "round-trip",
    icon: "SyncAltIcon",
    label: "Round Trip",
  },
  {
    id: "multi-city",
    name: "multi-city",
    icon: "SwapHorizIcon",
    label: "Multi-city",
  },
  {
    id: "one-way",
    name: "one-way",
    icon: "ArrowRightAltIcon",
    label: "One Way",
  },
];

export const passengersCount: Array<string> = ["1", "2", "3", "4", "5"];

export const seatingClass: Array<SeatingClassField> = [
  { id: "economy", name: "economy", label: "Economy" },
  { id: "premium-economy", name: "premium-economy", label: "Premium Economy" },
  { id: "business", name: "business", label: "Business" },
  { id: "first", name: "first", label: "First" },
];
