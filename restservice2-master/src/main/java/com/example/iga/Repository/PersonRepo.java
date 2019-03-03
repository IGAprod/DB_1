package com.example.iga.Repository;

import com.example.iga.Entity.Person;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PersonRepo {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Person> getAll(){
        return entityManager.createQuery("from Person c order by c.id ", Person.class).getResultList();
    }

    public List<Person> query(String query){

        return entityManager.createQuery(query,Person.class).getResultList();
    }

    public Person getById(int id) {
        return entityManager.find(Person.class, id);
    }

    public Person create(Person person) {
        entityManager.persist(person);
        return person;
    }

    public Person update(int id, Person country) {
        Person original = entityManager.find(Person.class, id);
        if (original != null) {
            original.setName(country.getName());
            entityManager.merge(original);
        }
        return original;
    }

    public void delete(int id) {
        Person person = entityManager.find(Person.class, id);
        if (person != null) {
            entityManager.remove(person);
        }
    }
}
