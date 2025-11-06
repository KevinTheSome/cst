import React from 'react';
import { Head } from '@inertiajs/react';

const Contacts: React.FC = () => {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Head title="Contacts" />

            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

            <div className="space-y-4 text-lg">
                <p><strong>Phone 1:</strong> +371 67089383</p>
                <p><strong>Phone 2:</strong> +371 29252975</p>
                <p><strong>Email:</strong> uldis.berzins_4@rtu.lv</p>
                <p><strong>Address:</strong> Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvia</p>
            </div>
        </div>
    );
};

export default Contacts;
