type LocalstorageItem = {
  value: any;
  expiry: number;
};

const setItemWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();
  const item: LocalstorageItem = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string): string | undefined => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return undefined;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return undefined;
  }

  return item.value;
};

export { setItemWithExpiry, getItemWithExpiry };
