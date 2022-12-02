import { ApplicationError } from "@/protocols";

export function badRequestError(): ApplicationError {
  return {
    name: "badRequestError",
    message: "some data is wrong in your request!",
  };
}
