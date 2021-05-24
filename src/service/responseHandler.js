import { plainToClass } from "class-transformer";

const success = (response, Model) => {
    return {
        data: Model ? toModel(Model, response.data["data"]) : response.data["data"] || response.data["message"],
        success: true
    };
};

const error = (response) => {
    return { data: [], success: false, error: response.data["message"]};
};

const toModel = (Model, data) => {
    return plainToClass(Model, data);
};

export { success, error };
