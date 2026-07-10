import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Calico Canada",
  description:
    "Get in touch with Calico Canada for product inquiries, wholesale pricing, bulk orders, and general questions. Phone: (778) 999-1023 | Email: dannyka7@gmail.com",
};

export default function Page() {
  return <ContactPageClient />;
}
