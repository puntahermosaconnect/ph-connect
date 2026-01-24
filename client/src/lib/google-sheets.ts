import { Listing } from "./mock-data";

const SPREADSHEET_ID = "16aIYKOln_dO1paNar8dGPEPVtkGxeb_TxGboxPD0JJs";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTX1kpOM_Vg8KUxlU8mAm1zVehGXQVMTCDVI-0YWBKjp5rCVPu42FHDxgh-1qIYpJf5-rUt6nUsiKX9/pub?output=csv`;

export interface Listing {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  subSubcategory?: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  rrss?: string;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
}

export interface RawListing {
  "Categoria": string;
  "Subcategoria": string;
  "Sub-Subcategoria": string;
  "Nombre del negocio": string;
  "Imagen del negocio": string;
  "Dirección": string;
  "RRSS": string;
  "Teléfono": string;
}

let cachedData: Listing[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchFromGoogleSheets(): Promise<Listing[]> {
  // Check cache
  const now = Date.now();
  if (cachedData.length > 0 && now - cacheTimestamp < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error("Failed to fetch spreadsheet");

    const csvText = await response.text();
    const listings = parseCSV(csvText);
    
    cachedData = listings;
    cacheTimestamp = now;
    
    return listings;
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    return [];
  }
}

function parseCSV(csvText: string): Listing[] {
  // Remove possible BOM or whitespace
  const cleanCsvText = csvText.trim();
  const lines = cleanCsvText.split("\n").map(line => line.trim()).filter(line => line);
  if (lines.length < 2) {
    console.error("CSV has no data lines");
    return [];
  }

  const headers = parseCSVLine(lines[0]);
  console.log("Detected headers:", headers);
  const listings: Listing[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    // Create a map for easier header lookup
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    const categoria = row["Categoria"];
    const subcategoria = row["Subcategoria"];
    const subSubcategoria = row["Sub-Subcategoria"];
    const nombre = row["Nombre del negocio"];
    const direccion = row["Dirección"];
    const telefono = row["Teléfono"];
    const imagen = row["Imagen del negocio"];
    const rrss = row["RRSS"];

    if (!nombre || !categoria) continue;

    const listing: Listing = {
      id: `${categoria}-${subcategoria}-${nombre}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: nombre.trim(),
      category: categoria.trim(),
      subcategory: subcategoria ? subcategoria.trim() : undefined,
      subSubcategory: subSubcategoria ? subSubcategoria.trim() : undefined,
      description: subcategoria ? subcategoria.trim() : categoria.trim(),
      address: direccion.trim(),
      phone: telefono.trim(),
      whatsapp: telefono.trim(),
      rrss: rrss.trim(),
      rating: 4.5,
      reviews: 0,
      image: imagen.trim() || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
      tags: [(subcategoria && subcategoria.trim()) || categoria.trim()],
    };

    listings.push(listing);
  }

  console.log(`Parsed ${listings.length} listings from CSV`);
  return listings;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export async function getListingsByCategory(category: string): Promise<Listing[]> {
  const allListings = await fetchFromGoogleSheets();
  console.log(`Searching for category: "${category}"`);
  const filtered = allListings.filter(
    listing => listing.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
  console.log(`Found ${filtered.length} listings for ${category}`);
  return filtered;
}

export async function getListingsBySubcategory(
  category: string,
  subcategory: string
): Promise<Listing[]> {
  const allListings = await fetchFromGoogleSheets();
  return allListings.filter(
    listing =>
      listing.category.toLowerCase() === category.toLowerCase() &&
      listing.subcategory.toLowerCase() === subcategory.toLowerCase()
  );
}
