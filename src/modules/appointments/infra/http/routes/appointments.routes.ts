import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments//services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// // Listando Agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// Criação de agendamento
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // Deixando minhas datas com um valor inteiro
  const parsedDate = parseISO(date);

  // Instancia do repository
  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  // Retornando a resposta ao usuário
  return response.json(appointment);
});

export default appointmentsRouter;
