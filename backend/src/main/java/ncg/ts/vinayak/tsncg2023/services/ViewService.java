package ncg.ts.vinayak.tsncg2023.services;

import ncg.ts.vinayak.tsncg2023.model.View;

import java.util.List;
import java.util.Optional;

public interface ViewService {
    public List<View> getAllViews();
    public Optional<View> getViewById(Long id);
    public Optional<View> updateView(View view, Long id);
    public View createView(View view);
    public String deleteView(Long id);

}
