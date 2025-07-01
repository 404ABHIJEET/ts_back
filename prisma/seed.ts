import prisma from '../src/lib/prisma'

async function main() {
    
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@example.com' },
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                name: "superadmin",
                email: 'admin@example.com',
                username: 'superadmin',
                password: 'hashed_password_here', 
                updatedAt: new Date()
            },
        });
        console.log('Super admin created.');
    } else {
        console.log('Super admin already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
