import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPlazaData(id: string) {
  return await prisma.plaza.findUnique({
    where: { id: parseInt(id) },
    include: {
    },
  });
}

export async function getCities() {
  try {
    const response = await fetch('/api/cities');
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCounties() {
  try {
    const response = await fetch('/api/counties');
    if (!response.ok) {
      throw new Error('Failed to fetch counties');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getLeafletMaps() {
  try {
    const response = await fetch('/api/maps');
    if (!response.ok) {
      throw new Error('Failed to fetch map data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPlazaStores() {
  try {
    const response = await fetch('/api/plaza-stores');
    if (!response.ok) {
      throw new Error('Failed to fetch plaza stores');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getPlazas = async () => {
  const response = await fetch('/api/plazas');
  if (!response.ok) {
    throw new Error('Failed to fetch plazas');
  }
  return response.json();
};

export const getCity = async () => {
  const response = await fetch('/api/cities');
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};

