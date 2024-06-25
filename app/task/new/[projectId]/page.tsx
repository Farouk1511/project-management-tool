'use client'
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createProject } from "@/app/lib/actions";
import { useEffect,useState } from "react";
import Project from "@/app/_models/projectModel";
import { connectToMongoDB } from "@/app/lib/connectDB";

export default function NewProject({ params }: { params: { projectId: string }}) {
  const [form] = Form.useForm();
  const [projectName, setProjectName] = useState<string>(params.projectId)

  useEffect(() => {
    const getProject = async () => {
        //await connectToMongoDB()
        const project = await Project.findById(params.projectId)
        console.log(project)
       setProjectName(project?.name)
    }

     getProject()
  },[params])

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
      <h1>Create a new Task</h1>
      <p>Create a new task for your project!</p>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Project Name"
          name="name"
        >
          <Input value={'hello'} disabled placeholder={projectName} />
        </Form.Item>
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: 'Please enter task name' }]}
        >
          <Input placeholder="Task name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter task description' }]}
        >
          <TextArea placeholder="Description of the task" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create task</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
