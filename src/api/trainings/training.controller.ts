import { Controller, Get, Query } from '@nestjs/common';
import trainings from 'mock/trainings';
import { Client, Storage } from 'appwrite';

const client = new Client();
const storage = new Storage(client);

client.setEndpoint('http://localhost:8001/v1').setProject('650bcf0779174ca1a5ae');

@Controller({ version: '1', path: 'trainings' })
export class TrainingsController {
  @Get()
  async getAllTrainings(@Query('filter') filter: string) {
    if (filter === 'all') return trainings;

    if (filter === 'upcoming')
      return trainings.filter((training) => training.status.toLowerCase().includes('upcoming'));

    if (filter === 'ongoing') return trainings.filter((training) => training.status.toLowerCase().includes('ongoing'));

    if (filter === 'completed')
      return trainings.filter((training) => training.status.toLowerCase().includes('completed'));
  }

  @Get('count')
  async getTrainingCountByFilter() {
    const all = trainings.length;
    const upcoming = trainings.filter((training) => training.status.toLowerCase().includes('upcoming')).length;
    const ongoing = trainings.filter((training) => training.status.toLowerCase().includes('ongoing')).length;
    const completed = trainings.filter((training) => training.status.toLowerCase().includes('completed')).length;

    return { all, upcoming, ongoing, completed };
  }

  @Get('filter')
  async getFilteredTrainings(@Query('status') status: string, @Query('source') source: string) {
    let filteredTrainings = [];

    if (status === 'all') {
      return trainings.filter((training) => training.source.toLowerCase().includes(source.toLowerCase()));
    } else {
      filteredTrainings = trainings.filter((training) => {
        if (
          training.status.toLowerCase().includes(status.toLowerCase()) &&
          training.source.toLowerCase().includes(source.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }

    return filteredTrainings;
  }

  @Get('test')
  async test() {
    return storage.listFiles('650bcf32c3852c99a9f7');
  }
}
