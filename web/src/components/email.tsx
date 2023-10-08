import * as React from 'react';

import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
} from '@react-email/components';

interface EmailTemplateProps {
    email: string;
}

const baseUrl = "https://timetouchedvillage.nl"

export const EmailTemplateUser: React.FC<Readonly<EmailTemplateProps>> = ({
    email,
}) => (
    <Html>
        <Head />
        <Preview>Here are your postcards!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/postcards.png`}
                    width="100%"
                    alt="Postcards"
                />
                <Img
                    src={`${baseUrl}/logo-colour.png`}
                    width="40%"
                    style={{ margin: '0 auto' }}
                    alt="Logo for TTV"
                />
                <Img
                    src={`${baseUrl}/david.png`}
                    width="50px"
                    style={{ margin: '0 auto' }}
                    alt="Sir David"
                />
                <Heading style={{ ...h1, textAlign: 'center' }}>Thank you for playing! We hope to see you again in the realms of time!</Heading>
                <Text style={{ ...h2, textAlign: 'center' }}>Attached you will find your postcards, captured after completing your Time Touched Village.</Text>
                <Img
                    src={`${baseUrl}/favicon.png`}
                    width="32"
                    height="32"
                    alt="TTV Logo"
                    style={{ margin: '0 auto' }}
                />
                <Text style={{ ...footer, textAlign: 'center' }}>
                    <Link
                        href="https://timetouchedvillage.nl"
                        target="_blank"
                        style={{ ...link, color: '#370731' }}
                    >
                        timetouchedvillage.nl
                    </Link>
                    <br />
                    An Interactive Learning Experience
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#ffffff',
};

const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
};

const h1 = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
};

const h2 = {
    color: '#898989',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '30px 0',
    padding: '0',
};

const link = {
    color: '#00D4CA',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
};

const text = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
};

const footer = {
    color: '#898989',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
};

const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    width: '90.5%',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    border: '1px solid #eee',
    color: '#333',
};