package ncg.ts.vinayak.tsncg2023.services;

import ncg.ts.vinayak.tsncg2023.exceptions.ViewNotFoundException;
import ncg.ts.vinayak.tsncg2023.model.View;
import ncg.ts.vinayak.tsncg2023.repository.ViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ViewServiceImpl implements ViewService {
    @Autowired
    ViewRepository viewDao;

    @Override
    public List<View> getAllViews() {
        return viewDao.findAll();
    }
    @Override
    public Optional<View> getViewById(Long id) {
        return viewDao.findById(id);
    }
//
    @Override
    public Optional<View> updateView(View updatedView, Long id) {
        return viewDao.findById(id)
                .map(view -> {
                    view.setName(updatedView.getName());
                    view.setChartType(updatedView.getChartType());
                    view.setCountry(updatedView.getCountry());
                    view.setIndicator(updatedView.getIndicator());
                    view.setStartDate(updatedView.getStartDate());
                    view.setEndDate(updatedView.getEndDate());
                    return viewDao.save(view);
                });

    }

    @Override
    public View createView(View newView) {
        viewDao.save(newView);
        return newView;
    }

    @Override
    public String deleteView(Long id) {
        if(!viewDao.existsById(id)){
            throw new ViewNotFoundException(id);
        }
        viewDao.deleteById(id);
        return  "View with id "+id+" has been deleted successfully.";
    }
}
