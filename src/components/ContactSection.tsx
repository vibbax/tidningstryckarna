import { useEditable } from "@/hooks/useEditable";
import ContactBlock from "@/components/sections/ContactBlock";

const ContactSection = () => {
  const t = useEditable("home");

  const email = t("contact", "email", "tidningstryckarna@tryckarna.com");
  const phone = t("contact", "phone", "+358 18 26669");
  const address = t("contact", "address", "Vikingagränd 2A, Mariehamn");
  const mapLink = t("contact", "map_link", "https://goo.gl/maps/RZqWc1zXuBhg8gYg8");

  return (
    <ContactBlock
      dateline={t("contact", "dateline", "Kontakt")}
      title={t("contact", "title", "Hör av dig till oss")}
      intro={t("contact", "intro", "Vi välkomnar förfrågningar om tryck, samarbeten eller besök i tryckeriet.")}
      fields={[
        {
          label: "E-post",
          value: email,
          href: `mailto:${email}`,
        },
        {
          label: "Telefon",
          value: phone,
          href: `tel:${phone.replace(/\s/g, "")}`,
          note: t("contact", "phone_note", "(efter kl. 18)"),
        },
        {
          label: "Besöksadress",
          value: address,
          href: mapLink,
          external: true,
        },
      ]}
    />
  );
};

export default ContactSection;
