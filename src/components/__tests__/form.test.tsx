import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { vi } from "vitest";
import { FormCalendar, FormColorPicker, FormInputText, FormNumber, FormTextarea } from "../form";
import { addLocale } from "primereact/api";

const submitMock = vi.fn();

function FormWrapper(props: {
  renderFromComponent: (control: any) => ReactElement;
  defaultValue?: any
}) {
  const {handleSubmit, control} = useForm({defaultValues: props.defaultValue || {}});

  return (
    <form onSubmit={handleSubmit((data) => submitMock(data))}>
      {props.renderFromComponent(control)}
    </form>
  );
}

describe("form", () => {
  describe("FormColorPicker", () => {
    it("should render component", () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormColorPicker control={control} name="test" />
      } />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should open panel by click", async () => {
      const {container} = render(<FormWrapper renderFromComponent={
        (control) => <FormColorPicker control={control} name="test" />
      } />);

      await userEvent.click(screen.getByRole("textbox"));

      const node = container.nextSibling! as HTMLElement;

      expect(node.querySelector(".p-colorpicker-content")).toBeInTheDocument();
    });
  });

  describe("FormInputText", () => {
    it("should render component", () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormInputText control={control} name="test" label="Form input" />
      } />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByText("Form input")).toBeInTheDocument();
    });

    it("should type text", async () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormInputText control={control} name="test" />
      } />);

      await userEvent.type(screen.getByRole("textbox"), "value");

      expect(screen.getByDisplayValue("value")).toBeInTheDocument();
    });

    it("should render default value", () => {
      render(<FormWrapper defaultValue={{test: "value"}} renderFromComponent={
        (control) => <FormInputText control={control} name="test" />
      } />);

      expect(screen.getByDisplayValue("value")).toBeInTheDocument();
    });
  });

  describe("FormNumber", () => {
    it("should render component", () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormNumber control={control} name="test" label="Form number" />
      } />);

      expect(screen.getByTestId("formNumber")).toBeInTheDocument();
      expect(screen.getByText("Form number")).toBeInTheDocument();
    });

    it("should type number value", async () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormNumber control={control} name="test" />
      } />);

      await userEvent.type(screen.getByTestId("formNumber"), "12345");
      
      expect(screen.getByDisplayValue("12.345")).toBeInTheDocument();
    });

    it("should not type text value", async () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormNumber control={control} name="test" />
      } />);

      await userEvent.type(screen.getByTestId("formNumber"), "value");
      
      expect(screen.queryByDisplayValue("value")).not.toBeInTheDocument();
    });

    it("should render default value", () => {
      render(<FormWrapper defaultValue={{test: "12345"}} renderFromComponent={
        (control) => <FormNumber control={control} name="test" />
      } />);

      expect(screen.getByDisplayValue("12.345")).toBeInTheDocument();
    });
  });

  describe("FromCalendar", () => {
    beforeAll(() => {
      addLocale("ru", {firstDayOfWeek: 1});
    });

    it("should render component", () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormCalendar control={control} name="test" label="Form calendar" />
      } />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByText("Form calendar")).toBeInTheDocument();
    });

    it("should open calendar panel by click", async () => {
      const {container} = render(<FormWrapper renderFromComponent={
        (control) => <FormCalendar control={control} name="test" label="Form calendar" />
      } />);

      await userEvent.click(screen.getByRole("textbox"));

      const node = container.nextSibling! as HTMLElement;

      expect(node.querySelector(".p-datepicker-group-container")).toBeInTheDocument();
    });
  });

  describe("FormTextarea", () => {
    it("should render component", () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormTextarea control={control} name="test" label="Form textarea" />
      } />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByText("Form textarea")).toBeInTheDocument();
    });

    it("should type text value", async () => {
      render(<FormWrapper renderFromComponent={
        (control) => <FormTextarea control={control} name="test" label="Form textarea" />
      } />);

      await userEvent.type(screen.getByRole("textbox"), "value");

      expect(screen.getByDisplayValue("value")).toBeInTheDocument();
    });

    it("should render default value", () => {
      render(<FormWrapper defaultValue={{test: "value"}} renderFromComponent={
        (control) => <FormTextarea control={control} name="test" label="Form textarea" />
      } />);

      expect(screen.getByDisplayValue("value")).toBeInTheDocument();
    });
  });
});