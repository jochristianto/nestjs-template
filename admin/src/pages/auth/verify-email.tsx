import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomMutation } from '@refinedev/core';

const { Title, Text } = Typography;

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const { mutate: verifyEmail } = useCustomMutation();

  const { mutate: resendEmail } = useCustomMutation();

  const handleSubmit = (values: any) => {
    setLoading(true);
    verifyEmail(
      {
        url: `/auth/email/verify`,
        method: 'post',
        values: {
          email: email || values.email,
          code: values.code,
        },
      },
      {
        onSuccess: (data: any) => {
          if (data.data.verified) {
            message.success('Email verified successfully');

            // If tokens are returned, log the user in
            if (data.data.accessToken) {
              const { accessToken, refreshToken, user } = data.data;
              localStorage.setItem('access_token', accessToken);
              localStorage.setItem('refresh_token', refreshToken);
              localStorage.setItem('user', JSON.stringify(user));
              navigate('/');
            } else {
              navigate('/login');
            }
          } else {
            message.error('Invalid verification code');
            setLoading(false);
          }
        },
        onError: () => {
          message.error('Failed to verify email. Please try again.');
          setLoading(false);
        },
      },
    );
  };

  const handleResend = () => {
    if (!email) {
      message.error('Email address is required');
      return;
    }

    setResendLoading(true);
    resendEmail(
      {
        url: `/auth/email/send-verification`,
        method: 'post',
        values: { email },
      },
      {
        onSuccess: () => {
          message.success('Verification email sent successfully');
          setResendLoading(false);
        },
        onError: () => {
          message.error('Failed to send verification email');
          setResendLoading(false);
        },
      },
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <MailOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <Title level={3} style={{ marginTop: 16 }}>
            Verify Your Email
          </Title>
          <Text type="secondary">Enter the verification code sent to your email</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} initialValues={{ email }}>
          {!email && (
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input size="large" placeholder="Email address" prefix={<MailOutlined />} />
            </Form.Item>
          )}

          {email && (
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <Text>Verification code sent to:</Text>
              <br />
              <Text strong>{email}</Text>
            </div>
          )}

          <Form.Item
            name="code"
            rules={[
              { required: true, message: 'Please enter verification code' },
              { len: 6, message: 'Code must be 6 characters' },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter 6-character code"
              maxLength={6}
              style={{ textAlign: 'center', fontSize: 20, letterSpacing: 4 }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Verify Email
            </Button>
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button type="link" onClick={handleResend} loading={resendLoading}>
              Resend Code
            </Button>
            <Button type="link" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};
