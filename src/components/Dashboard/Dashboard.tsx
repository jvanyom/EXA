import { ComingSoon, Layout } from "@/components";

import { TransferSearch } from "./components";

export const Dashboard = () => {
    return (
        <Layout title="dashboard">
            <section className="grid grid-cols-3 grid-rows-2 gap-3 flex-1">
                <section className="row-span-1 grid place-content-center bg-primary shadow-md rounded-md">
                    <TransferSearch />
                </section>
                <section className="flex justify-center col-span-2 box">
                    <ComingSoon />
                </section>
                <section className="flex justify-center box col-span-2">
                    <ComingSoon />
                </section>
                <section className="flex justify-center box col-span-1">
                    <ComingSoon />
                </section>
            </section>
        </Layout>
    );
};
