'use client'
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createProject } from "@/app/lib/actions";

export default function NewProject() {
  const [form] = Form.useForm();

  const onFinish = async (formData:FormData) => {
    try {
      console.log("Form Data:", formData);
      await createProject(formData);
      console.log("Project created successfully!");
      form.resetFields(); // Optionally reset form fields on successful submission
    } catch (error) {
      console.error("Error creating project:", error);
      // Implement error handling or feedback to the user
    }
  };

  return (
    <div>
      <h1>Create a new project</h1>
      <p>Create a new project and begin tracking tasks!</p>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder="Project name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter project description' }]}
        >
          <TextArea placeholder="Description of the project" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
