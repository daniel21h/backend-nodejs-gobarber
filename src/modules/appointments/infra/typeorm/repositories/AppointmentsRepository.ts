import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Encontrar agendamento na mesma data retornando true or false,
    // para não haver agendamentos no mesmo horário
    const findAppointment = await this.findOne({
      // Como se estivesse fazendo um query no DB
      where: { date },
    });

    return findAppointment;
  }
}
export default AppointmentsRepository;
