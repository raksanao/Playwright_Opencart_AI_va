export type UserRecord = {
  id: number;
  username: string;
  email: string;
  password: string;
};

function rndInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUsers(count = 5): UserRecord[] {
  const out: UserRecord[] = [];
  for (let i = 1; i <= count; i++) {
    const username = `user${i}${rndInt(10,99)}`;
    out.push({
      id: i,
      username,
      email: `${username}@example.com`,
      password: `P@ss${rndInt(100,999)}`,
    });
  }
  return out;
}

export function prettyPrint<T>(obj: T) {
  console.log(JSON.stringify(obj, null, 2));
}

export type CustomerRecord = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
};

export function generateCustomer(): CustomerRecord {
  const ts = Date.now();
  const randomPart = Math.random().toString(36).slice(2, 10);
  const fn = `FN${rndInt(1,999)}_${ts.toString().slice(-4)}`;
  const ln = `LN${rndInt(1,999)}_${ts.toString().slice(-4)}`;
  const email = `test.${ts}.${randomPart}@example.com`;
  const tel = `+1${rndInt(200,999)}${rndInt(100,999)}${rndInt(1000,9999)}`;
  const password = `P@ss${rndInt(1000,9999)}`;
  return {
    firstName: fn,
    lastName: ln,
    email,
    telephone: tel,
    password,
  };
}
