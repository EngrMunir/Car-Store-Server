export const USER_ROLE ={
    admin:'admin',
    user:'user'
} as const;

export type TRole = 'user' | 'admin';
export type TStatus = 'active' | 'inactive';
  
  export const USER_STATUS = ['active', 'inactive'] as const;
  
  export const userSearchableFields = [
    'name',
    'email',
    'role',
    'shippingAddress',
  ];
  