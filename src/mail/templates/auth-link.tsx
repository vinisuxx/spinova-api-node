import {
  Body,
  Button, Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img, Link, Preview, Section,
  Tailwind,
  Text
} from '@react-email/components';

export const AuthLinkEmailTemplate = (link: string) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Syne"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/syne/v22/8vIH7w4qzmVxm2BL9G78HEY.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Font
          fontFamily="Golos"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/golostext/v4/q5uXsoe9Lv5t7Meb31EcOR9UdVTNs822plVRRT5bGL4RWNyw2Io.woff2',
            format: 'woff2',
          }}
          fontStyle="normal"
        />
      </Head>
      <Preview >Spinova Auth</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                'golos': ['Golos', 'sans-serif'],
                'syne': ['Syne', 'sans-serif']
              }
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans antialiased box-border">
          <Container className="mx-auto my-[20px] max-w-[580px] rounded bg-[#EBEBEB] p-[20px]">
            <Section className="px-[5%] py-[40px] text-center">

              <Section>
                <Img
                  src="https://media.discordapp.net/attachments/812873690902560803/1201359077708673125/Logo.png?ex=65c987d4&is=65b712d4&hm=40fc760cebba61620dddf00ff22e09c5a06b515f75a840dfed230d8f2c101c04&=&format=webp&quality=lossless"
                  width="104"
                  height="74"
                  alt="Spinova"
                  className="mx-auto"
                />
              </Section>

              <Heading className="p-0vtext-[24px] mx-0 my-[30px] font-syne font-normal text-black">
                Log in to Spinova
              </Heading>

              <Text className="font-golos text-[15px] leading-[24px] text-black">
                Click the button below to confirm that you want to sing in to
                Spinova. This magic link will expire in 10 minutes.
              </Text>

              <Section className="mb-[25px] mt-[25px]">
                <Button
                  className="rounded-full bg-[#E14842] px-5 py-3 font-syne text-[15px] font-semibold text-white no-underline"
                  href={link}
                >
                  <span className='font-syne'>Authenticate</span>
                </Button>
              </Section>

              <Text className="m-0 mb-[25px] font-golos text-[12px] leading-[24px] tracking-tight text-black">
                Or sing in using this link:
              </Text>

              <Link href={link} className="font-golos text-[12px] leading-[15px] tracking-tight text-[#9D9D9D]">
                {link}
              </Link>

              <Text className="mt-[35px] font-golos text-[14px] leading-[15px] text-black">
                <strong className='font-bold'>Need any help?</strong> Don’t
                hesitate to contact us by replying to this e-mail.
              </Text>

              <Hr className=" mx-0 my-[26px] w-full border border-solid border-[#e3e3e3]" />

              <Text className="font-golos m-0 text-[12px] leading-[16px] text-[#9D9D9D]">
                If you didn’t request this e-mail, you can safely ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
