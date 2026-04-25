# Security Specification - E-Community SaaS

## Data Invariants
1. A user profile MUST have a valid role and be linked to a businessId (except for raw customers).
2. All business-related data (products, orders, transactions, batches) MUST have a `businessId`.
3. Users can only access data belonging to their `businessId`.
4. Only `OWNER` role (or matching `ownerId`) can modify business settings or critical financial data.

## The Dirty Dozen Payloads
1. **Unauthorized Profile Creation**: Attacker attempts to create a user profile with `role: 'OWNER'` for a random `businessId`.
2. **Business Hijacking**: Attacker tries to update `ownerId` of another business to their own UID.
3. **Cross-Tenant Data Leak**: Attacker tries to `get` a product doc belonging to another `businessId`.
4. **Price Manipulation**: Attacker (as Customer) tries to update a product price to $0.01.
5. **Role Escalation**: Employee tries to update their own role to `ADMIN`.
6. **Orphaned Record Creation**: Attacker tries to create a product without a `businessId`.
7. **Timestamp Spoofing**: Attacker sends a manual `updatedAt` string instead of `serverTimestamp()`.
8. **Invalid ID Injection**: Attacker tries to use a 1MB string as a document ID.
9. **Balance Modification**: Attacker tries to update a transaction's `amount`.
10. **State Skipping**: Attacker tries to update a production batch directly to `COMPLETED` without being the owner or assigned employee.
11. **Bulk Scrapping**: Attacker tries to `list` all transactions across all businesses.
12. **Ghost Field Injection**: Attacker attempts to add `isVerified: true` to their user profile.

## Verification
All the above payloads MUST result in `PERMISSION_DENIED` by the security rules.
