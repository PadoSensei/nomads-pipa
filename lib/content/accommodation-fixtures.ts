export interface AccommodationDirectoryItem {
  id: string;
  name: string;
  description: string;
  type: "houses" | "hostels" | "real-estate";
  typeLabel: string;
  contactUrl: string;
  tint: "mint" | "yellow" | "peach";
}

export const ACCOMMODATION_FIXTURES: AccommodationDirectoryItem[] = [
  {
    id: "acc-1",
    name: "Casas do Kai",
    description: "Quiet bungalows surrounded by tropical greenery near dolphins bay.",
    type: "houses",
    typeLabel: "Houses",
    contactUrl: "https://instagram.com",
    tint: "mint",
  },
  {
    id: "acc-2",
    name: "Pipa Vista Houses",
    description: "Panoramic cliff-top houses with dedicated work desks and high-speed Wi-Fi.",
    type: "houses",
    typeLabel: "Houses",
    contactUrl: "https://instagram.com",
    tint: "peach",
  },
  {
    id: "acc-3",
    name: "Vila Mundo Pipa",
    description: "Community-driven hostel with coworking spaces and weekly nomad dinners.",
    type: "hostels",
    typeLabel: "Hostels",
    contactUrl: "https://instagram.com",
    tint: "yellow",
  },
  {
    id: "acc-4",
    name: "Pousada Flor da Mata",
    description: "Serene garden lodge with shared kitchen and fast fiber connectivity.",
    type: "hostels",
    typeLabel: "Hostels",
    contactUrl: "https://instagram.com",
    tint: "mint",
  },
  {
    id: "acc-5",
    name: "Pipa Park Residence",
    description: "Spacious private apartments with swimming pool access and backup power.",
    type: "houses",
    typeLabel: "Houses",
    contactUrl: "https://instagram.com",
    tint: "peach",
  },
  {
    id: "acc-6",
    name: "Mehdi · Real Estate",
    description: "Trusted local broker specializing in verified mid-term nomad leases in Pipa.",
    type: "real-estate",
    typeLabel: "Real Estate",
    contactUrl: "https://instagram.com",
    tint: "yellow",
  },
];
