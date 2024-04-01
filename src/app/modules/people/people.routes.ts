import { Router } from "express";
import { PeopleController } from "./people.controller";

const router = Router()

router.get('/', PeopleController.getAllPeople)



export const PeopleRoutes = router;