import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Encontrar agendamento na mesma data retornando true or false,
    // para não haver agendamentos no mesmo horário
    const findAppointment = await this.findOne({
      // Como se estivesse fazendo um query no DB
      where: { date },
    });

    return findAppointment || null;
  }
}
export default AppointmentsRepository;
